import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';
import { FilterPanelComponent } from './movie-browser/filter-panel/filter-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './movie-browser/movie-list/movie-list.component';
import { MovieCardComponent } from './movie-browser/movie-list/movie-card/movie-card.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RoundPipe } from './utils/round.pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';
import { MovieSearchComponent } from './movie-browser/movie-search/movie-search.component';
import { MovieInfoComponent } from './movie-details/movie-info/movie-info.component';
import { MovieCastComponent } from './movie-details/movie-cast/movie-cast.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieBrowserComponent,
    FilterPanelComponent,
    MovieListComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    RoundPipe,
    MovieSearchComponent,
    MovieInfoComponent,
    MovieCastComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule
  ],
  providers: [ DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
