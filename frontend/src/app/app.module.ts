import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { httpAsyncFactory } from './factories/http-async/http-async.factory';
import { HomeComponent } from './pages/home/home.component';
import { HttpAsyncService } from './services/http-async/http-async.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HttpAsyncService, useFactory: httpAsyncFactory, deps: [HttpClient] },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
