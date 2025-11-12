# Build instructions

Based on the [basic build](README.md#build-instructions)

1. [Import Steamworks SDK](#import-steamworks-sdk)
2. `cmake -G` with `-DBUILD_WITH_STEAM=On`
```
cmake -G "Visual Studio 17 2022" -A x64 -DCMAKE_BUILD_TYPE=MinSizeRel -DBUILD_SDLGPU=On -DBUILD_WITH_ALL=On -DBUILD_WITH_STEAM=On ..
```
3. Build
```
cmake --build . --config MinSizeRel --parallel
```
4. [Import dll to bin](#import-dll-to-bin) (Once)
5. [Set Steam AppID](#set-steam-appid) (Only dev)

## Import Steamworks SDK

1. [Download](https://partner.steamgames.com/downloads/steamworks_sdk.zip) SDK from [Steamworks](https://partner.steamgames.com/doc/sdk)
2. Unzip
3. Copy folder `[SDKdir]/sdk/public/steam` to `[Tic80dir]/include/`
4. Copy folder `[SDKdir]/sdk/redistributable_bin` to `[Tic80dir]/include/`

```
[Tic80dir]
|- include
  |- redistributable_bin
    |- win64
      |- ...
    |- steam_api.dll
    |- steam_api.lib
    |- ...
  |- steam
    |- lib
      |- win32
        |- ...
      |- win64
        |- sdkencryptedappticket64.dll
        |- sdkencryptedappticket64.lib
      |- ...
    |- steam_api.h
    |- ...
```

## Import dll to bin

Copy file `[SDKdir]/sdk/redistributable_bin/steam_api64.dll` to `[Tic80dir]/build/bin/`

```
[Tic80dir]
|- build
  |- bin
    |- tic80.exe
    |- steam_api64.dll
    |- ...
```

## Set Steam AppID

For dev, you can create file `steam_appid.txt` in `[Tic80dir]/build/bin`, and write `480` to the file.

This way you can test the SteamAPIs with Steamworks example application (SpaceWar).

Also, you can test your own game, just use your AppID instead.

**Important**: When you ship your own game through Steam this file will not be needed as Steam will auto-detect your AppID when the game is launched.

[Learn more](https://partner.steamgames.com/doc/sdk/api/example)