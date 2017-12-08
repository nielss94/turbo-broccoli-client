import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { PageComponent } from './page/page.component';
import { PageService } from './page/page.service';
import { DashboardService } from './dashboard/dashboard.service';
import { PostComponent } from './post/post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { LoginService } from './login/login.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageComponent,
    PostComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    ProfileDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [PageService, DashboardService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
