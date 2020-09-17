import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditWebinarRoutingModule } from './edit-webinar-routing.module';
import { EditWebinarComponent } from './edit-webinar.component';


@NgModule({
  declarations: [EditWebinarComponent],
  imports: [
    CommonModule,
    EditWebinarRoutingModule
  ]
})
export class EditWebinarModule { }
