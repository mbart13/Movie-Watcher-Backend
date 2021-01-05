import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';
import { FilterPanelComponent } from './movie-browser/filter-panel/filter-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './movie-browser/movie-list/movie-list.component';
import { MovieCardComponent } from './movie-browser/movie-list/movie-card/movie-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieBrowserComponent,
    FilterPanelComponent,
    MovieListComponent,
    MovieCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
