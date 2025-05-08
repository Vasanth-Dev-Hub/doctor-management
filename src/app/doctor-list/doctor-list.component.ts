import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorFormComponent } from "./doctor-form/doctor-form.component";

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, DoctorFormComponent],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {
  doctorListData = [
    { name: 'Vasanth', specialization: 'Cardiologist', contact: '9098712345', status: true },
    { name: 'Kumar', specialization: 'Cardiac Electrophysiologist', contact: '9097812345', status: false },
    { name: 'Mari', specialization: 'Neurologist', contact: '9097612345', status: true },
    { name: 'Manoj', specialization: 'Neurosurgeon', contact: '9097512345', status: false },
    { name: 'Dhanu', specialization: 'Nuclear Medicine Specialist', contact: '9097412345', status: true },
  ];
  specializationList = ['Cardiologist', 'Cardiac Electrophysiologist', 'Neurologist', 'Neurosurgeon', 'Nuclear Medicine Specialist'];
  action: string = "";
  data:any;

  constructor() {

  }

  ngOnInit() {

  }

  doctorFormSubmit(event: boolean) {
    this.action = "";
    this.data = null;
  }
}
