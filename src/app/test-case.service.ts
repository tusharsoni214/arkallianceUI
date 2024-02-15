import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private http: HttpClient) { }

  getTestNames(){
    return this.http.get('http://127.0.0.1:5000/all_test_names');
  }

  // getPerformanceTestNames(){
  //   return this.http.get('/performance_test_names');
  // }

  runAPITests() {
    return this.http.get('http://127.0.0.1:5000/run_api_tests');
  }
  runAPITestsByName(testCaseName:string) {
    return this.http.get(`http://127.0.0.1:5000/run_api_tests/${testCaseName}`);
  }

  runDatabaseTests() {
    return this.http.get('http://127.0.0.1:5000/run_database_tests');
  }
  runDatabaseTestsByName(testCaseName:string) {
    return this.http.get(`http://127.0.0.1:5000/run_database_tests/${testCaseName}`);
  }
  runUITestsByName(testCaseName:string) {
    return this.http.get(`http://127.0.0.1:5000/run_ui_tests/${testCaseName}`);
  }
  runUITests() {
    return this.http.get('http://127.0.0.1:5000/run_ui_tests');
  }
  // runPerformanceTests() {
  //   return this.http.get('/run_performance_tests');
  // }
}
