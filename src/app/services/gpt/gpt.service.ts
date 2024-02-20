import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GptService {

  constructor(private http: HttpClient) { }

  getGptResponse(message: string){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(`http://127.0.0.1:5000/get_gpt_response`,{message},{headers});
  }
}
