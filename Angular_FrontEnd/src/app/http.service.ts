import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {http_url as HTTP_URL} from './global';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  authenticate_user(username,password){
    
    const options = {headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}};
    var json_data = {"username":username,"password":password};
    return this.httpClient.post<any>(HTTP_URL+'/auth',JSON.stringify(json_data),options).pipe(retry(3),catchError(this.handleError))
  }

  image_upload(file,token){
     // Create form data
    const options = {headers: { "Authorization":"JWT "+token}};
     const formData = new FormData(); 
     formData.append("image#upload", file, file.name);
     return this.httpClient.post<any>(HTTP_URL+'/upload_image',formData,options).pipe(retry(3),catchError(this.handleError))
  }

}