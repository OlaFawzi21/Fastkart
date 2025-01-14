import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ScrollPositionGuard } from './core/guard/scroll.guard';
import { content } from './shared/routes/routes';
import { ZoneGuard } from './core/guard/zone.guard';
// import { MaintenanceComponent } from './maintenance/maintenance.component';

export const routes: Routes = [
   {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  // {
  //   path: "maintenance",
  //   component: MaintenanceComponent
  // },
  {
    path: "",
    component: LayoutComponent,
    children: content,
    canActivate: [ScrollPositionGuard],
  }
];
