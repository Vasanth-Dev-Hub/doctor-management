import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorFormComponent } from "./doctor-form/doctor-form.component";
import { DoctorServiceService } from '../doctorService/doctor-service.service';
import { ConfirmationComponent } from "../confirmation/confirmation.component";

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, DoctorFormComponent, ConfirmationComponent],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {
  doctorListData: any = [];
  specializationList: any = [];
  action: string = "";
  data: any;
  selectedDoctorId:any;

  constructor(private doctorService: DoctorServiceService) {

  }

  ngOnInit() {
    this.getSpecialization();
    this.getDoctorData();
  }

  doctorFormSubmit(event: boolean) {
    this.action = "";
    this.data = null;
    if (!!event) {
      this.getDoctorData();
    }
  }

  getDoctorData() {
    this.doctorListData = this.doctorService.getFullDoctorData();
  }

  getSpecialization() {
    this.specializationList = this.doctorService.getSpecializationData();
  }

  confirmationStatus(event:any){
    if(!!event){
      this.doctorService.deleteDoctorData(this.selectedDoctorId)
      this.getDoctorData();
      this.selectedDoctorId = null;
    }else{
      this.selectedDoctorId = null;
    }
  }
}
