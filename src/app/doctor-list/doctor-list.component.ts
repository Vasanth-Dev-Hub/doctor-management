import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorFormComponent } from "./doctor-form/doctor-form.component";
import { DoctorServiceService } from '../doctorService/doctor-service.service';
import { ConfirmationComponent } from "../confirmation/confirmation.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, DoctorFormComponent, ConfirmationComponent, ReactiveFormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {
  doctorListData: any = {};
  specializationList: any = [];
  action: string = "";
  data: any;
  selectedDoctorId:any;
  pageNo: number = 0;
  pageSize: number = 10;
  searchForm: FormGroup;
  isloading: boolean = false;

  constructor(private doctorService: DoctorServiceService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      doctorName: [''],
      specialization: ['']
    })
  }

  ngOnInit() {
    this.getSpecialization();
    this.getDoctorDataList();
  }

  doctorFormSubmit(event: boolean) {
    this.action = "";
    this.data = null;
    if (!!event) {
      this.getDoctorDataList(this.pageNo);
    }
  }

  getDoctorDataList(pageNo?:number) {
    this.isloading = true;
    this.doctorListData = {};
    const specialization = this.searchForm.get('specialization')?.value ? this.searchForm.get('specialization')?.value : "";
    const doctorName = this.searchForm.get('doctorName')?.value ? this.searchForm.get('doctorName')?.value : "";
    this.pageNo = pageNo ? pageNo : 0;
    this.doctorListData = this.doctorService.getDoctorData(specialization, doctorName, this.pageNo, this.pageSize);
    this.isloading = false;
  }

  getSpecialization() {
    this.specializationList = this.doctorService.getSpecializationData();
  }

  confirmationStatus(event:any){
    if(!!event){
      this.doctorService.deleteDoctorData(this.selectedDoctorId)
      this.getDoctorDataList(this.pageNo);
      this.selectedDoctorId = null;
    }else{
      this.selectedDoctorId = null;
    }
  }

  pageEvent(pageEvent:any) {
    this.pageNo = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.getDoctorDataList(this.pageNo)
  }
}
