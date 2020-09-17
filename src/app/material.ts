import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import{MatSelectModule}from '@angular/material/select';
import{MatListModule}from '@angular/material/list';


import { NgModule } from '@angular/core';

@NgModule({
    imports:[
            MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,MatSidenavModule,MatToolbarModule,
            MatMenuModule,MatIconModule,MatListModule,MatTableModule,MatSelectModule
    ],

    exports:[
            MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,MatSidenavModule,MatToolbarModule,
            MatMenuModule,MatIconModule,MatListModule,MatTableModule,MatSelectModule
    ]
})
export class MaterialModule{}