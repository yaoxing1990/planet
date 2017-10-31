import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CentreComponent } from './centre.component';

import { CentreRouterModule } from './centre-router.module';
import { NationComponent } from './nation/nation.component';
import { CommunityComponent } from '../community/community.component';

@NgModule({
  imports: [
    CentreRouterModule, CommonModule, FormsModule
  ],
  declarations: [
    CentreComponent,
    NationComponent,
    CommunityComponent
  ]
})
export class CentreModule {}
