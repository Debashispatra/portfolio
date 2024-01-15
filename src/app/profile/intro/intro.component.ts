import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import Typed from 'typed.js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  cvUrl: any
  constructor(private profileService:ProfileService,private router:Router) { }

  ngOnInit() {
    var options = {
      strings: ['','Full-Stack', 'WEB','Mean-Stack'],
      typeSpeed: 120,
      backSpeed: 100,
      loop: true,
    };
    
    var typed = new Typed('.typed', options);
    typed.reset(true)
    this.cvUrl =  this.profileService.resumeurl
  }
  contact(){
    console.log("inside contact");
    this.router.navigate(['/contact'])
  }
}
