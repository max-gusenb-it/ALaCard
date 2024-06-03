import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { SharedModule } from './shared/shared.module';
import { getLanguage } from './core/utils/language.util';
import { AUTHENTICATION_STATE_TOKEN, AuthenticationState } from './core/state/authentication/authentication.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { LoadingState } from './core/state';
import { DatePipe } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxsModule.forRoot(
      [
        AuthenticationState,
        LoadingState
      ], 
      {
        developmentMode: !environment.production
      }
    ),
    NgxsStoragePluginModule.forRoot({
      key: AUTHENTICATION_STATE_TOKEN
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: getLanguage()
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase.config)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()), 
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['http://localhost:9099'] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: !environment.production ? ['localhost', 8080] : undefined },
    { provide: USE_STORAGE_EMULATOR, useValue: !environment.production ? ['localhost', 9199] : undefined },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase.config },
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }, 
    ScreenTrackingService, 
    UserTrackingService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
