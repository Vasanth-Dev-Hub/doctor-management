import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {


  constructor() { }

  addDoctorData(formData: any) {
    const data = this.getFullDoctorData();
    data.push(formData);
    localStorage.setItem('doctorData', JSON.stringify(data));
  }


  updateDoctorData(formData: any) {
    let data = this.getFullDoctorData();
    const index = data.findIndex((res: any) => res.id == formData.id);
    data = data.filter((res: any) => res.id != formData.id);
    data.splice(index, 0, formData);
    localStorage.setItem('doctorData', JSON.stringify(data));
  }

  deleteDoctorData(id: any) {
    const doctorData = this.getFullDoctorData();
    const data = doctorData.filter((res: any) => res.id != id);
    localStorage.setItem('doctorData', JSON.stringify(data));
  }

  getFullDoctorData() {
    const data = localStorage.getItem('doctorData');
    return data ? JSON.parse(data) : [];
  }

  getSpecializationData() {
    const specializationList = ['Cardiologist', 'Cardiac Electrophysiologist', 'Neurologist', 'Neurosurgeon', 'Nuclear Medicine Specialist'];
    return specializationList;
  }
}
