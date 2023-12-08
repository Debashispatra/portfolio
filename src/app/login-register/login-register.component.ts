import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  form=new FormGroup({
    userName:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required])
  })
  password: any;

  show = false;
  constructor(private service:UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.password = 'password';
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
  userRegister(){
    this.service.userRegister(this.form.value).subscribe((result:any)=>{
      console.log("backend response",result);
        if (result.status===1) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: result.message
          });
  
          this.form.reset();
        }else if(result.status===0){
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Your registration successfull"
          });
  
          this.form.reset();
        }
    })
  }

  logIn(){
    var enteredValue=this.form.value
    var data={
      "email":enteredValue.email,
      "password":enteredValue.password
    }
    this.service.logIn(data).subscribe((result:any)=>{
      console.log("login data received",result);
      var role=result.data.role
      console.log("role",role);
      localStorage.setItem("token-->",result.generatedToken)
      if (result.status===0) {
        if (result.data.role=="user") {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: result.message
          })
          this.router.navigate(['/profile'])
          
        }else if(result.data.role=="admin"){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: result.message
          })
          this.router.navigate(['/admindashboard'])

        }
      }
    })
  }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  openFrgt(){
    const modalDiv=document.getElementById('frgtModel')
    if (modalDiv!= null) {
      modalDiv.style.display='block'
    }
  }
  closefrgt(){
    const modalDiv=document.getElementById('frgtModel')
    if (modalDiv!= null) {
      modalDiv.style.display='none'
    }
  }
  frgtpwd(){
    this.service.forgetPassword(this.form.value).subscribe((result)=>{
      console.log("receive from backend",result);
      if (result.status===0) {
        Swal.fire({
          title: `Sending a passcode to this Mail Id ${result.email}`,
          icon: "info",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
      }
      this.form.reset();
    })
  }
}
