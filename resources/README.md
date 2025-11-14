# Resources

Resources for `export`

## Windows

### win
```
cd build
cmake -G "Visual Studio 17 2022" -DBUILD_SDLGPU=ON -DCMAKE_BUILD_TYPE=MinSizeRel -DBUILD_WITH_STEAM=ON -DBUILD_STATIC=ON -DBUILD_EDITORS=OFF -DBUILD_WITH_ALL=ON ..
cmake --build . --config MinSizeRel --parallel
cp ./bin/tic80.exe ../resources/1.2-dev/win.exe
```

### winlua
```
cd build
cmake -G "Visual Studio 17 2022" -DBUILD_SDLGPU=ON -DCMAKE_BUILD_TYPE=MinSizeRel -DBUILD_WITH_STEAM=ON -DBUILD_STATIC=ON -DBUILD_EDITORS=OFF -DBUILD_WITH_ALL=OFF -DBUILD_WITH_LUA=ON ..
cmake --build . --config MinSizeRel --parallel
cp ./bin/tic80.exe ../resources/1.2-dev/winlua.exe
```

### winjs
```
cd build
cmake -G "Visual Studio 17 2022" -DBUILD_SDLGPU=ON -DCMAKE_BUILD_TYPE=MinSizeRel -DBUILD_WITH_STEAM=ON -DBUILD_STATIC=ON -DBUILD_EDITORS=OFF -DBUILD_WITH_ALL=OFF -DBUILD_WITH_JS=ON ..
cmake --build . --config MinSizeRel --parallel
cp ./bin/tic80.exe ../resources/1.2-dev/winjs.exe
```
