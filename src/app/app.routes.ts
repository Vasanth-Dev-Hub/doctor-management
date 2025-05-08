import { Routes } from '@angular/router';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorFormComponent } from './doctor-list/doctor-form/doctor-form.component';

export const routes: Routes = [
    {path: '', component: DoctorListComponent},
    {path: 'doctor', component: DoctorListComponent},
    {path: 'update-doctor', component: DoctorFormComponent}
];
