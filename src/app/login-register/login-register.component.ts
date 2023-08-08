import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openModel(){
    const modalDiv=document.getElementById('myModal')
    if (modalDiv!= null) {
      modalDiv.style.display='block'
    }
  }
  closeModel(){
    const modalDiv=document.getElementById('myModal')
    if (modalDiv!= null) {
      modalDiv.style.display='none'
    }
  }
}
