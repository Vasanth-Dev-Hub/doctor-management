import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-list',
  imports: [CommonModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent {
  doctorListData = [
    {name:'Vasanth',specialization:'Cardiologist',contact:'9098712345',status:true},
    {name:'Kumar',specialization:'Cardiac Electrophysiologist',contact:'9097812345',status:false},
    {name:'Mari',specialization:'Neurologist',contact:'9097612345',status:true},
    {name:'Manoj',specialization:'Neurosurgeon',contact:'9097512345',status:false},
    {name:'Dhanu',specialization:'Nuclear Medicine Specialist',contact:'9097412345',status:true},
  ]

  constructor(){

  }

  ngOnInit(){

  }
}
