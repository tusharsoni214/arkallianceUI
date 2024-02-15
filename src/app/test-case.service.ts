import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private http: HttpClient) { }

  getDataBaseTestNames(){
    return this.http.get('/database_test_names');
  }
  getUITestNames(){
    return this.http.get('/ui_test_names');
  }
  getAPITestNames(){
    return this.http.get('/api_test_names');
  }
  // getPerformanceTestNames(){
  //   return this.http.get('/performance_test_names');
  // }

  runAPITests() {
    return this.http.get('/run_api_tests');
  }

  runDatabaseTests() {
    return this.http.get('/run_database_tests');
  }
  runUITests() {
    return this.http.get('/run_ui_tests');
  }
  // runPerformanceTests() {
  //   return this.http.get('/run_performance_tests');
  // }
}
