import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName:string='';
  greetingMsg:string='';
  constructor(private service:UserServiceService,private router: Router) { }

  ngOnInit() {
    this.getToken()
  }

  getToken(){
    this.service.getToken().subscribe((res)=>{
      console.log("get token data",res);
      this.userName=res.username
      this.greetingMsg=res.greeting_message

    })
  }
  logout(){
    localStorage.removeItem('token-->');
    this.router.navigate([''])
  }
}
