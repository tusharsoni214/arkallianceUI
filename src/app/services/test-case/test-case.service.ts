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
  //RUN ALL TEST BY TYPE
  runAllTests()  {
    return this.http.get(`http://127.0.0.1:5000/run_all_tests`);
  }
  runTest(testTypes: string)  {
    return this.http.get(`http://127.0.0.1:5000/run_test/${testTypes}`);
  }
  runTestByFile(testTypes: string,fileName: string) {  
    return this.http.get(`http://127.0.0.1:5000/run_test/${testTypes}/${fileName}`);
  }

  runTestByTestName(testTypes: string,fileName: string,testName: string) {  
    return this.http.get(`http://127.0.0.1:5000/run_test/${testTypes}/${fileName}/${testName}`);
  }
  // runUITests() {
  //   return this.http.get('http://127.0.0.1:5000/run_ui_tests');
  // }
  // runAPITests() {
  //   return this.http.get('http://127.0.0.1:5000/run_api_tests');
  // }
  // runDatabaseTests() {
  //   return this.http.get('http://127.0.0.1:5000/run_database_tests');
  // }

  //RUN ALL TEST OF FILE
  // runAPITestsByFileName(fileName:string) {
  //   return this.http.get(`http://127.0.0.1:5000/run_api_tests/${fileName}`);
  // }
  // runDatabaseTestsByFileName(fileName:string) {
  //   return this.http.get(`http://127.0.0.1:5000/run_database_tests/${fileName}`);
  // }
  // runUITestsByFileName(fileName:string) {
  //   return this.http.get(`http://127.0.0.1:5000/run_ui_tests/${fileName}`);
  // }
 
  // //RUN ALL TEST OF FILE
  // runAPITestsByTestName(fileName:string,testName:string) {
  //   return this.http.get(`http://127.0.0.1:5000/run_api_tests/${fileName}/${testName}`);
  // }
  // runDatabaseTestsByTestName(fileName:string,testName:string) {
  //   return this.http.get(`http://127.0.0.1:5000/run_database_tests/${fileName}/${testName}`);
  // }
  // runUITestsByTestName(fileName:string,testName:string) {
  //   return this.http.get(`http://127.0.0.1:5000/run_ui_tests/${fileName}/${testName}`);
  // }
  
}
