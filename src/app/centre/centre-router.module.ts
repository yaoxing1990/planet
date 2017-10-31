import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityComponent } from '../community/community.component';
import { CentreComponent } from '../centre/centre.component';
import { NationComponent } from './nation/nation.component';


const routes: Routes = [
  { path: '', component: NationComponent },
  { path: 'community', component: CommunityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentreRouterModule {}
