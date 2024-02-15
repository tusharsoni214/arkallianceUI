import { Component, Input, OnInit } from '@angular/core';
import { TestCaseService } from '../test-case.service';

@Component({
  selector: 'app-test-case-detail',
  templateUrl: './test-case-detail.component.html',
  styleUrls: ['./test-case-detail.component.scss']
})

export class TestCaseDetailComponent implements OnInit{
  http: any;
  constructor(private testService: TestCaseService){}
  @Input() caseType:string='';
  apiCases:any;
  uiCases:any;
  databaseCases:any;
    ngOnInit(): void {
      this.fetchDataFromBackend()
    }
    fetchDataFromBackend(): void {
      this.testService.getTestNames().subscribe((names:any) => {
        if(this.caseType.toUpperCase().includes('UI')){
          this.caseType = "UI";
          this.testCaseNames = names.ui
        }
        if(this.caseType.toUpperCase().includes('API')){
          this.caseType = "API";
          this.testCaseNames = names.api
        }
        if(this.caseType.toUpperCase().includes('DATABASE')){
          this.caseType = "DATABASE"
          this.testCaseNames = names.database
        }
      });
    }
    typeLogs(logs: string, index: number, logElement: HTMLElement) {
      if (index < logs.length) {
        if (logs[index] === '\n') {
          logElement.appendChild(document.createElement('br')); 
        } else {
          logElement.innerHTML += logs[index]; 
        }
        index++;
        setTimeout(() => this.typeLogs(logs, index, logElement), 5); 
      }
    }
    showLogs(index: number, logs: string) {
      const logElement = document.getElementById('log' +this.caseType+ index); 
      if (logElement) {
        logElement.innerHTML = ''; // Clear existing content
        this.typeLogs(logs, 0, logElement);
      }
    }
    updatePanelState(index: number, expanded: boolean) {
      this.panelExpanded[index] = expanded;
    }
    testCaseNames:any= ['Test Case 1','Test Case 2','Test Case 3','Test Case 4'];
    panelOpened:boolean = true;
    loading: boolean[] = new Array(this.testCaseNames.length).fill(false);
    panelExpanded:boolean[]= new Array(this.testCaseNames.length).fill(false);
    logs:string[]= new Array(this.testCaseNames.length).fill('');


    runTestCase(i:number,caseName:string,event:MouseEvent) {
      event.stopPropagation();
      this.panelExpanded[i]  = true;
      this.loading[i]=true
      switch(this.caseType){
        case"UI":{
          this.testService.runUITestsByName(caseName).subscribe((data:any) =>{
            console.log(data.logs);
            this.loading[i]=false;
            this.logs[i] = data.logs
            // this.logs[i] = this.logs[i].replace(/\n/g, '<br>');
            this.showLogs(i,this.logs[i])
          });
          break;
        }
        case"API":{
          this.testService.runAPITestsByName(caseName).subscribe((data:any) =>{
            console.log(data);
            this.loading[i]=false;
            this.logs[i] = data.logs
            // this.logs[i] = this.logs[i].replace(/\n/g, '<br>');
            this.showLogs(i,this.logs[i])
          });
          break;
        }
        case"DATABASE":{
          this.testService.runDatabaseTestsByName(caseName).subscribe((data:any) =>{
            console.log(data);
            this.loading[i]=false;
            this.logs[i] = data.logs
            // this.logs[i] = this.logs[i].replace(/\n/g, '<br>');
            this.showLogs(i,this.logs[i])
          });
          break;
        }
      }
     
     
    }
}
