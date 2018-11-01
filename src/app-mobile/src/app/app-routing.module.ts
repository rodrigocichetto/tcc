import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PAGES } from './app.constants';

const routes: Routes = [
  { path: '', redirectTo: PAGES.LOGIN, pathMatch: 'full'},
  { path: PAGES.LOGIN, loadChildren: './login/login.module#LoginPageModule' },
  { path: PAGES.REGISTER, loadChildren: './register/register.module#RegisterPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: PAGES.IRRIGATION, loadChildren: './irrigation/irrigation.module#IrrigationPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
