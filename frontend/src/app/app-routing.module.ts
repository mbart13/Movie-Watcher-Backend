import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';

const routes: Routes = [
  { path: 'movie-browser', component: MovieBrowserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
