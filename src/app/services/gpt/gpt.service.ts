import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GptService {

  constructor(private http: HttpClient) { }

  getGptResponse(message: string){
    return this.http.get(`http://127.0.0.1:5000/get_gpt_response/${message}`);
  }
}
