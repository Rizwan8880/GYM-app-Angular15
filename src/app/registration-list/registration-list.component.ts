import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { user } from '../model/user.model';
import { ApiService } from '../service/api.service';
import {  Router } from '@angular/router';
import { NgConfirmModule, NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  dataSource!: MatTableDataSource<user>;
public users!:user[];
@ViewChild(MatPaginator) paginator!:MatPaginator
@ViewChild(MatSort) sort!:  MatSort
displayedColumns :string []=['id',"firstName",
"lastName",
"email",
"mobile",
"bmiresult",
"gender",
"package",
"enquiryDate",
"Action"

]
constructor(private api:ApiService , private router:Router ,private confirm:NgConfirmService,
  private tost:NgToastService){

}
  ngOnInit(): void {
   this.getUser();
  }
getUser(){
  this.api.getRegisteredUser()
  .subscribe(res=>{
    this.users =res
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
edit(id:number){
  this.router.navigate(['update',id])
  }


  delete(id :number){
    this.confirm.showConfirm("Are you sure want to delete ?",
    ()=>{
this.api.deleteRegisteredUser(id)
.subscribe(res=>{
  this.tost.success({detail:'Success',summary:'User Update',duration:3000});
  this.getUser()
})

},
()=>{

})
    }

  
}
