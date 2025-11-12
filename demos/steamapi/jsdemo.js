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
	()=>steam_nstat(ACHS.NUM_GAMES.key,ACHS.NUM_GAMES.stat+5),
	()=>steam_nstat(ACHS.NUM_GAMES.key,ACHS.NUM_GAMES.stat-3),
	()=>{},
	()=>steam_fstat(ACHS.TRAVELED.key),
	()=>steam_fstat(ACHS.TRAVELED.key,ACHS.TRAVELED.stat+5),
	()=>steam_fstat(ACHS.TRAVELED.key,ACHS.TRAVELED.stat-3),
	()=>{},
	()=>steam_achiProg(ACHS.TRAVEL_ACCUM.key),
]

let lastResult=undefined
let page=0
function draw() {
	const c1=5
	const c2=6
	const lh=6
	let tx,ty

	tx=2
	ty=2-lh
	print(`Current Achievements:`,tx,ty+=lh,c1)
	print(`${ACHS.WIN_ONE.active?ACHS.WIN_ONE.key:''}`,tx,ty+=lh,c1)
	print(`${ACHS.TRAVEL_ACCUM.active?ACHS.TRAVEL_ACCUM.key:''}`,tx,ty+=lh,c1)

	tx=2+140
	ty=2-lh
	print(`Current Stats:`,tx,ty+=lh,c1)
	print(`${ACHS.NUM_GAMES.stat}`,tx,ty+=lh,c1)
	print(`${ACHS.TRAVELED.stat}`,tx,ty+=lh,c1)

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
		['Q', '17', 'Get Stat Value (int)', `steam_nstat("${ACHS.NUM_GAMES.key}")`],
		['W', '23', 'Set Stat Value+5 (int)', `steam_nstat("${ACHS.NUM_GAMES.key}",val+5)`],
		['E', '05', 'Set Stat Value-3 (int)', `steam_nstat("${ACHS.NUM_GAMES.key}",val-3)`],
		[],
		['R', '18', 'Get Stat Value (float)', `steam_fstat("${ACHS.TRAVELED.key}")`],
		['T', '20', 'Set Stat Value+5 (float)', `steam_fstat("${ACHS.TRAVELED.key}",val+5)`],
		['Y', '25', 'Set Stat Value-3 (float)', `steam_fstat("${ACHS.TRAVELED.key}",val-3)`],
		[],
		['P', '16', 'Pop-up Progress of Achievement', `steam_achiProg("${ACHS.TRAVEL_ACCUM.key}",cur,5280)`],
	]
	lines.forEach(a=>{a.length>0&&(a[4]=`${a[0]}(${a[1]}) : ${a[2]}\n  ${a[3]}`)})

	const istart=page?11:0
	const iend=page?lines.length:10

	ty+=lh
	var w0=print(`Commands:`,tx,ty,c1)
	var w1=print('PageUp(54)',tx+w0+10,ty,key(54)?c2:c1)
	var w2=print(' / ',tx+w0+10+w1,ty,c1)
	print('PageDown(55)',tx+w0+10+w1+w2,ty,key(55)?c2:c1)

	ty+=2
	for (let i=istart; i<iend; i++) {
		lines[i].length > 0
			? (print(lines[i][4],tx,ty+=lh,key(+lines[i][1])?c2:c1), ty+=lh)
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
	ty+=lh
	var w0=print(`Last Result: `,tx,ty,c1)
	if (lastResult) {
		print(lastResult,tx+w0,ty,c2)
	}

	if (keyp(54)) page=0 // PAGEUP
	if (keyp(55)) page=1 // PAGEDOWN
}

function BOOT()
{
	init()
}

function TIC()
{
	cls(13)
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
