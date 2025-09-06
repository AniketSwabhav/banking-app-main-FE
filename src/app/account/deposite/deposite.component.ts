import { Component } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deposite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.css']
})
export class DepositeComponent {

  constructor(
    private location: Location
  ) { }

  onDeposit(){

  }

  goBack(){
     this.location.back();
  }
}
