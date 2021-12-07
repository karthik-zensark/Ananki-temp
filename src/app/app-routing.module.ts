import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'admin', component: AdminpanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
