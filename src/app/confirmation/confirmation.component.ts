import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  @Output() confirmationStatus = new EventEmitter<any>();

  confirmation(status: boolean){
    this.confirmationStatus.emit(status);
  }
}
