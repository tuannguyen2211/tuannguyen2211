import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  userName: string;
  joinDate: string;
  constructor() { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = user.userName;
    this.joinDate = user.joingDate;
  }

}
