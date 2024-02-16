import { Component, Input, OnInit } from '@angular/core';
import { TestCaseService } from '../services/test-case/test-case.service';
import { LogService } from '../services/log/log.service';

@Component({
  selector: 'app-test-case-functions',
  templateUrl: './test-case-functions.component.html',
  styleUrls: ['./test-case-functions.component.scss'],
})
export class TestCaseFunctionsComponent implements OnInit {
  constructor(private testService: TestCaseService,private logService:LogService) {}

  ngOnInit(): void {
  }
  @Input() testFunctions: any;
  @Input() fileName: any;
  @Input() testType: any;
  @Input() logIndex: number=0;
  updatePanelState(index: number, expanded: boolean) {
    this.panelExpanded[index] = expanded;
  }
 
  testFileNames: any = [
    'Test Case 1',
    'Test Case 2',
    'Test Case 3',
    'Test Case 4',
  ];
  panelOpened: boolean = true;
  loading: boolean[] = new Array(this.testFileNames.length).fill(false);
  panelExpanded: boolean[] = new Array(this.testFileNames.length).fill(false);
  logs: string[] = new Array(this.testFileNames.length).fill('');


  runTestCaseByName(i: number, fileName: string,testName:string, event: MouseEvent) {
    event.stopPropagation();
    this.panelExpanded[i] = true;
    this.loading[i] = true;
    this.testService.runTestByTestName(this.testType,fileName, testName).subscribe((data:any)=>{
      this.loading[i]=false;
      this.logs[i] = data.logs
      this.logService.showLogs(this.logIndex,this.logs[i])
    });
  
  }
}
