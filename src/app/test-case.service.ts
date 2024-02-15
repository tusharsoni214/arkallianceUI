import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private http: HttpClient) { }

  runAPITests() {
    return this.http.get('/run_api_tests');
  }

  runDatabaseTests() {
    return this.http.get('/run_database_tests');
  }
}
