import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {


  constructor() { }

  addDoctorData(formData: any) {
    let data = this.getFullDoctorData();
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
    let data = this.getFullDoctorData();
    data = data.filter((res: any) => res.id != id);
    localStorage.setItem('doctorData', JSON.stringify(data));
  }

  getFullDoctorData() {
    const data = localStorage.getItem('doctorData');
    return data ? JSON.parse(data) : [];
  }

  getDoctorData(specialization:string, doctorName:string, pageNo:number, pageSize: number){
    const data = this.getFullDoctorData();
    let filterData = [];
    if(specialization && doctorName){
      filterData = data.filter((res:any)=> res?.specialization == specialization && res?.name.toLowerCase().includes(doctorName.toLowerCase()));
    }else if(doctorName){
      filterData = data.filter((res:any)=> res?.name.toLowerCase().includes(doctorName.toLowerCase()));
    }else if(specialization){
      filterData = data.filter((res:any)=> res?.specialization == specialization);
    }else{
      filterData = data;
    }
    
    const totalElements = filterData.length;
    const offset = pageNo * pageSize;
    const doctorData = filterData.slice(offset, offset + pageSize);
    return {
      data : doctorData,
      totalElements
    }
  }

  getSpecializationData() {
    const specializationList = ['Cardiologist', 'Cardiac Electrophysiologist', 'Neurologist', 'Neurosurgeon', 'Nuclear Medicine Specialist'];
    return specializationList;
  }
}
