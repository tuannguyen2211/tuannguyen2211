import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from '../user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public fullName: string;
  public joingDate: string;
  private id: number;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      var user = JSON.parse(localStorage.getItem('currentUser'));
      this.id = user.Id;
      this.fullName = user.fullName;
    });
  }
}
