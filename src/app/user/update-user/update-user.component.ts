import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent{

  userIDtoUpdate: any;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private userData: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userIDtoUpdate = params.get('id');
      console.log('Received ID:', this.userIDtoUpdate);
      this.userData.viewUser(this.userIDtoUpdate).subscribe((data) => {
        this.user = data;
        this.updateUser.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phoneNo: this.user.phoneNo,
          isAdmin: this.user.isAdmin,
          isActive: this.user.isActive,
        });
      });
    });
  }

  updateUser = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNo: new FormControl(''),
    isAdmin: new FormControl(),
    isActive: new FormControl(),
  });

  getUserFormData() {
    console.log(this.updateUser.value);
    if (this.userIDtoUpdate)
      this.userData.updateUser(this.userIDtoUpdate, this.updateUser.value).subscribe((result) => {
        console.log(result);
        alert("User updated successfully");
        this.router.navigate(['/admin/view-all-users']);
      })
  }

}
