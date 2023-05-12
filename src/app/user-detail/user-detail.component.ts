import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { user } from '../model/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

public userID!:number
userDetail!:user
constructor(private activetRoute :ActivatedRoute ,
        private api:ApiService
  ){

}

  ngOnInit(): void {
   this.activetRoute.params.subscribe(val=>{
    this.userID =val['id'];
    this.fatchUserDetails(this.userID)
   })
  }
fatchUserDetails(userID :number){
  this.api.getRegisteredUserId(userID).subscribe(res=>{
    this.userDetail =res;

  })
}
}
