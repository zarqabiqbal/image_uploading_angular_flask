import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  token = "";
  image_name = ""
  constructor() { }
  reset_image(){
    this.image_name="";
  }
}
