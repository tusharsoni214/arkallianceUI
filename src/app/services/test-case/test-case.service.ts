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
  getFunctionSourceCode(testTypes: string,fileName: string,testName: string){
    return this.http.get(`http://127.0.0.1:5000/suggest_code/${testTypes}/${fileName}/${testName}`);
  }
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
}
