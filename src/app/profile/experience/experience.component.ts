import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

// workexp: any
rows:any[] | undefined;
data:any[] | undefined;
  constructor(private profileService:ProfileService) { }

    ngOnInit() {

      // this.workexp =  this.profileService.exprience()
      this.getExperiences()
    }
    getExperiences(){
      this.profileService.getExperience().subscribe((res)=>{
        console.log("getting expriences data from backend",res);
        var get=res.data
        this.rows=get;
        this.data=this.rows
      })
    }
}
