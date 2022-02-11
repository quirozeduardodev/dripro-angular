import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {EndpointService} from './services/endpoints/endpoint.service';
import {AuthService} from './services/auth.service';
import {ConfigurationService} from './services/configuration.service';
import {LocalStorageService} from './services/local-storage.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthGuard} from "./guards/auth.guard";
import {BootstrapService} from "./services/bootstrap.service";
import {ReportEndpointService} from "./services/endpoints/report-endpoint.service";
import {UnitOfWorkDatabase} from "./database/unit-of-work.database";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ManualEndpointService} from "./services/endpoints/manual-endpoint.service";
import {AnswerEndpointService} from "./services/endpoints/answer-endpoint.service";
import {CategoryEndpointService} from "./services/endpoints/category-endpoint.service";
import {ContactEndpointService} from "./services/endpoints/contact-endpoint.service";
import {CustomerEndpointService} from "./services/endpoints/customer-endpoint.service";
import {CountryEndpointService} from "./services/endpoints/country-endpoint.service";
import {DelayEndpointService} from "./services/endpoints/delay-endpoint.service";
import {GeneratorEndpointService} from "./services/endpoints/generator-endpoint.service";
import {LocationEndpointService} from "./services/endpoints/location-endpoint.service";
import {MotorEndpointService} from "./services/endpoints/motor-endpoint.service";
import {QTAEndpointService} from "./services/endpoints/qta-endpoint.service";
import {TypeEndpointService} from "./services/endpoints/type-endpoint.service";
import {UnitEndpointService} from "./services/endpoints/unit-endpoint.service";
import {UserEndpointService} from "./services/endpoints/user-endpoint.service";
import {OfflineDataService} from "./services/offline-data.service";
import {ComponentsModule} from "./components/components.module";
import { ApplicationEndpointService } from './services/endpoints/application-endpoint.service';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        TranslateModule.forRoot({
            defaultLanguage: 'en_US',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        HttpClientModule,
        ComponentsModule,
        // ServiceWorkerModule.register('ngsw-worker.js', {
        //   enabled: environment.production,
        //   // Register the ServiceWorker as soon as the app is stable
        //   // or after 30 seconds (whichever comes first).
        //   registrationStrategy: 'registerWhenStable:30000'
        // })
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    AuthService,
    ConfigurationService,
    LocalStorageService,

    // Endpoints
    EndpointService,
    ReportEndpointService,
    ManualEndpointService,
    AnswerEndpointService,
    ApplicationEndpointService,
    CategoryEndpointService,
    ContactEndpointService,
    CategoryEndpointService,
    CustomerEndpointService,
    CountryEndpointService,
    DelayEndpointService,
    GeneratorEndpointService,
    LocationEndpointService,
    MotorEndpointService,
    QTAEndpointService,
    TypeEndpointService,
    UnitEndpointService,
    UserEndpointService,

    // Database
    UnitOfWorkDatabase,

    // High Level Services
    OfflineDataService,

    // Bootstrapping
    BootstrapService,

    // Guards
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
