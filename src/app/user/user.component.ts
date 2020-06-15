import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserdataService } from '../services/userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userData;
  userForm: FormGroup;
  editUserForm: FormGroup;
  showEditUserForm = false;
  editFormId;
  submitted = false;
  editsubmitted = false;

  // variables to status of request;
  userCreated = false;
  userEdited = false;
  userDeleted = false;
  userDeletedId;
  constructor(
    private userDataService: UserdataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.userDataService.getUserData().subscribe((data) => {
      console.log('data', data);
      this.userData = data;
    });

    this.initForm();
  }

  get f() {
    return this.userForm.controls;
  }
  get ef() {
    return this.editUserForm.controls;
  }

  initForm() {
    this.userForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  createUser(event, userform) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userDataService.createUser(this.userForm.value).subscribe((data) => {
      console.log('post created', data);
      this.userCreated = true;
      setTimeout(() => {
        this.userCreated = false;
      }, 2000);
    });
  }

  editUser(event, data) {
    this.showEditUserForm = true;
    this.editFormId = data.Id;
    this.editUserForm = this.fb.group({
      id: [data.id, Validators.required],
      title: [data.title, Validators.required],
      body: [data.body, Validators.required],
    });
  }

  editUserData(event, userform) {
    this.editsubmitted = true;

    if (this.editUserForm.invalid) {
      return;
    } else {
      this.userDataService
        .editUser(this.editUserForm.value)
        .subscribe((data) => {
          console.log('post edited', data);
          this.userEdited = true;
          setTimeout(() => {
            this.userEdited = false;
            this.showEditUserForm = false;
          }, 2000);
        });
    }
  }

  deleteUser(event, userData) {
    this.userDataService.deleteUser(userData).subscribe((data) => {
      console.log('post deleted', data);
      this.userDeletedId = userData.id;
      this.userDeleted = true;

      setTimeout(() => {
        this.userDeleted = false;
        location.reload();
      }, 2000);
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
