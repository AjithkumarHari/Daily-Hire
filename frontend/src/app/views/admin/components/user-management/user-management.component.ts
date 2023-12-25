import { Component } from '@angular/core';
import { User } from '../../../../types/User';
import { take } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  users$!: User[];
  allUsers$!: User[];
  currentPage: number = 1;
  pages: number[] = [];
  userSub: any;
  userStatusSub: any;
  form!: FormGroup;

  constructor( private adminService: AdminService,  private formBuilder : FormBuilder,){}

  ngOnInit(){
    this.userSub = this.adminService.getAllUsers().pipe(take(1)).subscribe((data: any)=>{ 
      this.allUsers$ = data;
      this.users$ = this.allUsers$;
      this.countPages(this.users$.length)
    });
    this.form = this.formBuilder.group({
      searchKey : new FormControl(null, [Validators.required]),
      statusKey : new FormControl('All', [Validators.required]),
    })
  }

  onApplySearchFilter(){
    this.users$ =  this.allUsers$.filter(user => {
      const lowercaseText =  this.form.value.searchKey.toLowerCase();
      const lowercaseName = user.name.toLowerCase();
      return lowercaseName.includes(lowercaseText);
    });
    this.countPages(this.users$.length);
  }

  onApplyStatusFilter(){
    const statusKey = this.form.value.statusKey;
    if (statusKey === 'All') {
       this.users$ = this.allUsers$
    } else if (statusKey === 'hidden') {
      if(this.form.value.searchKey == null)
        this.users$ = this.allUsers$.filter(service => service.isListed === true);
      else
        this.users$ = this.users$.filter(service => service.isListed === true);
      
    }  else if (statusKey === 'unHidden') {
      if(this.form.value.searchKey == null)
        this.users$ = this.allUsers$.filter(service => service.isListed === false);
      else
        this.users$ = this.users$.filter(service => service.isListed === false);
    }  
  }

  onStatusChange(userId: any){
    this.userStatusSub = this.adminService.changeUserStatus(userId).pipe(take(1)).subscribe(()=> { 
      this.ngOnInit();
    });
  }

  countPages(total: number){   
    this.pages = []; 
    for(let i=1;i<=Math.ceil(total/6);i++){
      this.pages.push(i)
    }
  }

  onPrevious($event: Event) {
    $event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onNext($event: Event) {
    $event.preventDefault();
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
    }
  }

  onPageClick(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getUser(){
    return this.users$
  }
}
