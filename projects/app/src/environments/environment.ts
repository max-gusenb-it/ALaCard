// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    config: {
      apiKey: "AIzaSyBnR10q7u9R5Qes2aH8O4EgpATUiLw-WG8",
      authDomain: "alacard-de849.firebaseapp.com",
      projectId: "alacard-de849",
      storageBucket: "alacard-de849.appspot.com",
      messagingSenderId: "745548816018",
      appId: "1:745548816018:web:30e6b520eec9c789b3d04b",
      measurementId: "G-4DX30KQP5R"
    },
    storageReference: "gs://alacard-de849.appspot.com"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
