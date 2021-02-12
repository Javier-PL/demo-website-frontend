//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

//Angular Material Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

//Components
import { AppComponent } from './app.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { WebComponent } from './components/web/web.component';
import { AdminComponent } from './components/admin/admin.component';

//Carousel
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

//Services
import { InitService } from './services/init.service';
import { PhotoService } from './services/photo.service';
import { CategoryService } from './services/category.service';

//Translation 
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


//Google Maps
import { AgmCoreModule } from '@agm/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


const appRoutes: Routes = [
  { path: '', component: WebComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    WebComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatGridListModule,
    MatToolbarModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAW5rHVhlhDrLfg_KhVFzYpy9D8zTNgrTo',
      /* apiKey is required, unless you are a
      premium customer, in which case you can
      use clientId
      */
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
   })
  ],
  providers: [PhotoService, CategoryService, InitService],
  bootstrap: [AppComponent],
})
export class AppModule {}


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}