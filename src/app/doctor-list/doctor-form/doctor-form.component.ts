import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css'
})
export class DoctorFormComponent implements OnInit, OnChanges {
  specializationList = ['Cardiologist', 'Cardiac Electrophysiologist', 'Neurologist', 'Neurosurgeon', 'Nuclear Medicine Specialist'];
  doctorForm: FormGroup;
  @Input() action: string = '';
  @Input() data: any;
  @Output() doctorFormSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.doctorForm = this.fb.group({
      name:[null,[Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s'-]+$/)]],
      specialization: [null,[Validators.required]], 
      contact: [null,[Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(/^[0-9]+$/)]], 
      status:[true,[Validators.required]]
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.action && this.action != "ADD"){
      this.setDoctorForm();
    }
  }

  ngOnInit() {

  }

  setDoctorForm(){
    this.doctorForm.get('name')?.setValue(this.data?.name);
    this.doctorForm.get('specialization')?.setValue(this.data?.specialization);
    this.doctorForm.get('contact')?.setValue(this.data?.contact);
    this.doctorForm.get('status')?.setValue(this.data?.status);
  }

  saveDoctorDetails(){
    let closeButton: any = document.getElementById("closeDoctorFormModal")
    closeButton.click();
    this.closeModal(true);
  }

  closeModal(formSave: boolean){
    this.doctorFormSubmit.emit(formSave);
    this.doctorForm.reset();
    this.doctorForm.get('status')?.setValue(true);
  }
}
