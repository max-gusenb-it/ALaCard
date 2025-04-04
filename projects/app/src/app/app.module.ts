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
import { environment } from 'projects/app/src/environments/environment';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LanguageUtils } from '../../../shared/src/lib/utils/utils/language.util';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  AUTHENTICATION_STATE_TOKEN,
  AuthenticationState,
  ErrorMonitorState,
  INFORMATION_STATE_TOKEN,
  InformationState,
  LoadingState,
  SharedModule
} from '@shared';
import { RoomState, DeckState, ROOM_STATE_TOKEN, DECK_STATE_TOKEN } from '@features';
import { ItNavigationComponent } from './it-navigation/it-navigation.component';
import { ItNavItemComponent } from './it-navigation/it-nav-item/it-nav-item.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ItNavigationComponent,
    ItNavItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxsModule.forRoot(
      [
        AuthenticationState,
        LoadingState,
        RoomState,
        DeckState,
        ErrorMonitorState,
        InformationState
      ], 
      {
        developmentMode: !environment.production
      }
    ),
    NgxsStoragePluginModule.forRoot({
      key: [AUTHENTICATION_STATE_TOKEN, ROOM_STATE_TOKEN, DECK_STATE_TOKEN, INFORMATION_STATE_TOKEN]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: LanguageUtils.getBrowserLanguage()
    }),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase.config)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()), 
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
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
