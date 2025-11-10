# Import Steamworks SDK

## Import to project

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

## Import to build

1. Build tic80
2. Copy file `[SDKdir]/sdk/redistributable_bin/steam_api64.dll` to `[Tic80dir]/build/bin/`

```
[Tic80dir]
|- build
  |- bin
    |- tic80.exe
    |- steam_api64.dll
    |- ...
```
