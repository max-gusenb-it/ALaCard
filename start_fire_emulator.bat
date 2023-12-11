Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass &
firebase emulators:start --only storage,firestore,auth,ui --import=./emulators_export --export-on-exit=./emulators_export
