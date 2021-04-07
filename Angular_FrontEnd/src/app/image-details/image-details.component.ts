import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { ImageDataService } from '../image-data.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  constructor(private router : Router,public httpService:HttpService,public dataService:ImageDataService) { }

  ngOnInit(): void {
    if(this.dataService.token==""){
      this.httpService.authenticate_user("zarqab",'password1').subscribe(
        data => {
          if('access_token' in data){
            this.dataService.token = data['access_token']
          }
        },
        error => {

        }
      );
    }
  }

  return(){
    this.dataService.reset_image();
    this.router.navigate([""])
  }

}
