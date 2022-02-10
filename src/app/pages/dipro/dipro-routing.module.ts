import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'reports'
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'manuals',
    loadChildren: () => import('./manuals/manuals.module').then(m => m.ManualsModule)
  },
  {
    path: 'offline-data',
    loadChildren: () => import('./offline-data/offline-data.module').then(m => m.OfflineDataModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiproRoutingModule { }
