import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { AddPage } from '../add/add.page';
import { SettingsPage } from '../settings/settings.page';
import { PAGES } from '../app.constants';

const routes: Routes = [
  {
    path: PAGES.TABS,
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: `/${PAGES.TABS}/(home:home)`,
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'add',
        outlet: 'add',
        component: AddPage
      },
      {
        path: 'settings',
        outlet: 'settings',
        component: SettingsPage
      }
    ]
  },
  {
    path: '',
    redirectTo: `/${PAGES.TABS}/(home:home)`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
