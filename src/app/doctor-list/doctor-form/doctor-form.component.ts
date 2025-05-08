import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorServiceService } from '../../doctorService/doctor-service.service';

@Component({
  selector: 'app-doctor-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css'
})
export class DoctorFormComponent implements OnInit, OnChanges {
  specializationList: any = [];
  doctorForm: FormGroup;
  @Input() action: string = '';
  @Input() data: any;
  @Output() doctorFormSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private doctorService: DoctorServiceService) {
    this.doctorForm = this.fb.group({
      name: [null, [Validators.required]],
      specialization: [null, [Validators.required]],
      contact: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(/^[0-9]+$/)]],
      status: ['true', [Validators.required]]
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.action && this.action != "ADD") {
      this.setDoctorForm();
    }
  }

  ngOnInit() {
    this.getSpecialization();
  }

  getSpecialization() {
    this.specializationList = this.doctorService.getSpecializationData();
  }

  setDoctorForm() {
    this.doctorForm.get('name')?.setValue(this.data?.name);
    this.doctorForm.get('specialization')?.setValue(this.data?.specialization);
    this.doctorForm.get('contact')?.setValue(this.data?.contact);
    this.doctorForm.get('status')?.setValue(this.data?.status);
  }

  saveDoctorDetails() {
    const doctorData = this.doctorService.getFullDoctorData();
    let formData = this.doctorForm.value;
    if (this.action == "ADD") {
      formData['id'] = doctorData.length + 1;
      this.doctorService.addDoctorData(formData);
    } else if (this.action == "EDIT") {
      formData['id'] = this.data?.id;
      this.doctorService.updateDoctorData(formData);
    }
    const closeButton: any = document.getElementById("closeDoctorFormModal")
    closeButton.click();
    this.closeModal(true);
  }

  closeModal(formSave: boolean) {
    this.doctorFormSubmit.emit(formSave);
    this.doctorForm.reset();
    this.doctorForm.get('status')?.setValue(true);
  }
}
