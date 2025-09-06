import { Component } from '@angular/core';
import { CommonModule , Location} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {

  constructor(
    private location: Location
  ) { }

  onWithdraw(){

  }

  goBack(){
     this.location.back();
  }
}
