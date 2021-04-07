import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { ImageDataService } from '../image-data.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  file:File=null;
  constructor(public httpService:HttpService,public dataService:ImageDataService,private router : Router) { }

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

  // On file Select
  onFileChange(event) {
    this.file = event.target.files[0];
  }

  uploadImage(){
    this.dataService.reset_image()
    this.httpService.image_upload(this.file,this.dataService.token).subscribe(
      data => {
        if("success" in data){
          this.dataService.image_name = data['image_details']['name']
          this.router.navigate(["image_details"])
        }
      },
      error => {

      }
    );
  }


}
