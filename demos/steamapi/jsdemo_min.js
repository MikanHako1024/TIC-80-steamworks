// title:   game title
// author:  game developer, email, etc.
// desc:    short description
// site:    website link
// license: MIT License (change this to your license of choice)
// version: 0.1
// script:  js

const ACHS={
	WIN_ONE: {
		key: "ACH_WIN_ONE_GAME",
		active: false,
	},
	TRAVEL_ACCUM: {
		key: "ACH_TRAVEL_FAR_ACCUM",
		active: false,
	},
	NUM_GAMES: {
		key: "NumGames",
		stat: 0, // int
		achi: 'WIN_ONE',
	},
	TRAVELED: {
		key: "FeetTraveled",
		stat: 0, // float
		achi: 'TRAVEL_ACCUM',
	},
}

function refreshData() {
	var [ok,v]=steam_achi(ACHS.WIN_ONE.key)
	ACHS.WIN_ONE.active=!!v
	var [ok,v]=steam_achi(ACHS.TRAVEL_ACCUM.key)
	ACHS.TRAVEL_ACCUM.active=!!v
	var [ok,v]=steam_nstat(ACHS.NUM_GAMES.key)
	ACHS.NUM_GAMES.stat=v
	var [ok,v]=steam_fstat(ACHS.TRAVELED.key)
	ACHS.TRAVELED.stat=v
}

function init() {
	steam_init()
	refreshData()
}

const lineFuncs = [
	()=>steam_achi(ACHS.WIN_ONE.key),
	()=>steam_achi(ACHS.WIN_ONE.key,true),
	()=>steam_achi(ACHS.WIN_ONE.key,false),
	()=>{},
	()=>steam_achi(ACHS.TRAVEL_ACCUM.key),
	()=>steam_achi(ACHS.TRAVEL_ACCUM.key,true),
	()=>steam_achi(ACHS.TRAVEL_ACCUM.key,false),
	()=>{},
	()=>steam_rstat(false),
	()=>steam_rstat(true),
	()=>{},
	()=>steam_nstat(ACHS.NUM_GAMES.key),
	()=>steam_nstat(ACHS.NUM_GAMES.key,ACHS.NUM_GAMES.stat+7),
	//()=>steam_nstat(ACHS.NUM_GAMES.key,ACHS.NUM_GAMES.stat-3),
	()=>{},
	()=>steam_fstat(ACHS.TRAVELED.key),
	()=>steam_fstat(ACHS.TRAVELED.key,ACHS.TRAVELED.stat+7),
	//()=>steam_fstat(ACHS.TRAVELED.key,ACHS.TRAVELED.stat-3),
	()=>{},
	()=>steam_prog(ACHS.TRAVEL_ACCUM.key),
]

let lastResult=undefined
function draw() {
	cls(14)

	const c1=5
	const c2=6
	const c3=3
	const c4=4
	const lh=6
	let tx,ty

	tx=2
	ty=2-lh
	print(`Current Achievements:`,tx,ty+=lh,c3)
	print(`${ACHS.WIN_ONE.active?ACHS.WIN_ONE.key:''}`,tx,ty+=lh,c4)
	print(`${ACHS.TRAVEL_ACCUM.active?ACHS.TRAVEL_ACCUM.key:''}`,tx,ty+=lh,c4)

	tx=2+140
	ty=2-lh
	print(`Current Stats:`,tx,ty+=lh,c3)
	print(`${ACHS.NUM_GAMES.stat}`,tx,ty+=lh,c4)
	print(`${ACHS.TRAVELED.stat}`,tx,ty+=lh,c4)

	tx=2
	ty=2+lh*3-lh
	let lines=[
		['1', '28', 'Get Unlock Status', `steam_achi("${ACHS.WIN_ONE.key}")`],
		['2', '29', 'Unlock Achievement', `steam_achi("${ACHS.WIN_ONE.key}",true)`],
		['3', '30', 'Resets Unlock Status', `steam_achi("${ACHS.WIN_ONE.key}",false)`],
		[],
		['4', '31', 'Get Unlock Status', `steam_achi("${ACHS.TRAVEL_ACCUM.key}")`],
		['5', '32', 'Unlock Achievement', `steam_achi("${ACHS.TRAVEL_ACCUM.key}",true)`],
		['6', '33', 'Resets Unlock Status', `steam_achi("${ACHS.TRAVEL_ACCUM.key}",false)`],
		[],
		['9', '36', 'Resets Stats Only', `steam_rstat(false)`],
		['0', '27', 'Resets Stats and Achis', `steam_rstat(true)`],
		[],
		['Q', '17', 'Get Stat Value', `steam_nstat("${ACHS.NUM_GAMES.key}")`],
		['W', '23', 'Set Stat Value+7', `steam_nstat("${ACHS.NUM_GAMES.key}",val+7)`],
		//['E', '05', 'Set Stat Value-3', `steam_nstat("${ACHS.NUM_GAMES.key}",val-3)`],
		[],
		['R', '18', 'Get Stat Value', `steam_fstat("${ACHS.TRAVELED.key}")`],
		['T', '20', 'Set Stat Value+7', `steam_fstat("${ACHS.TRAVELED.key}",val+7)`],
		//['Y', '25', 'Set Stat Value-3', `steam_fstat("${ACHS.TRAVELED.key}",val-3)`],
		[],
		['P', '16', 'Pop-up Progress of Achievement', `steam_prog("${ACHS.TRAVEL_ACCUM.key}",cur,5280)`],
	]
	lines.forEach(a=>{a.length>0&&(a[4]=`${a[0]}(${a[1]}) : ${a[2]}`)})

	const istart=0
	const iend=lines.length

	ty+=lh
	var w0=print(`Commands:`,tx,ty,c3)

	ty+=2
	for (let i=istart; i<iend; i++) {
		lines[i].length > 0
			? print(lines[i][4],tx,ty+=lh,key(+lines[i][1])?c2:c1)
			: (ty+=2)
	}

	for (let i=istart; i<iend; i++) {
		if (lines[i].length > 0) {
			if (keyp(+lines[i][1])) {
				lastResult=lineFuncs[i]()
				if (!Array.isArray(lastResult)) {
					lastResult=[lastResult]
				}
				refreshData()
				break
			}
		}
	}

	ty+=2
	var w0=print(`Last Result: `,tx,ty+=lh,c3)
	if (lastResult) {
		print(lastResult,tx+w0,ty,c2)
	}

	ty+=4
	var w0=print('Please switch to English input method',tx,ty+=lh,c3)
	print(`Any Input: ${key()?'Ok':'No'}`,tx+w0-40,ty-lh-2,key()?c2:c1)
}

function BOOT()
{
	init()
}

function TIC()
{
	draw()
}

// <TILES>
// 001:eccccccccc888888caaaaaaaca888888cacccccccacc0ccccacc0ccccacc0ccc
// 002:ccccceee8888cceeaaaa0cee888a0ceeccca0ccc0cca0c0c0cca0c0c0cca0c0c
// 003:eccccccccc888888caaaaaaaca888888cacccccccacccccccacc0ccccacc0ccc
// 004:ccccceee8888cceeaaaa0cee888a0ceeccca0cccccca0c0c0cca0c0c0cca0c0c
// 017:cacccccccaaaaaaacaaacaaacaaaaccccaaaaaaac8888888cc000cccecccccec
// 018:ccca00ccaaaa0ccecaaa0ceeaaaa0ceeaaaa0cee8888ccee000cceeecccceeee
// 019:cacccccccaaaaaaacaaacaaacaaaaccccaaaaaaac8888888cc000cccecccccec
// 020:ccca00ccaaaa0ccecaaa0ceeaaaa0ceeaaaa0cee8888ccee000cceeecccceeee
// </TILES>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000304000000000
// </SFX>

// <PALETTE>
// 000:1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57
// </PALETTE>

// <TRACKS>
// 000:100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// </TRACKS>
