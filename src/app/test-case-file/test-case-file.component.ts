import { Component, Input, OnInit } from '@angular/core';
import { TestCaseService } from '../services/test-case/test-case.service';
import { LogService } from '../services/log/log.service';

@Component({
  selector: 'app-test-case-file',
  templateUrl: './test-case-file.component.html',
  styleUrls: ['./test-case-file.component.scss']
})
export class TestCaseDetailComponent implements OnInit{
  http: any;
  constructor(private testService: TestCaseService,private logService:LogService){}
  @Input() testType:string='';
  @Input() logIndex:number=0;
  apiCases:any;
  uiCases:any;
  databaseCases:any;
  ngOnInit(): void {
    this.fetchDataFromBackend()
  }
  fetchDataFromBackend(): void {
    this.testService.getTestNames().subscribe((names:any) => {
      switch(this.testType.toUpperCase()){
        case'UI':{
          names.ui = JSON.parse(names.ui);
          this.testFileNames = names.ui
          break;
        }
        case'API':{
          this.testType = "API";
          names.api = JSON.parse(names.api);
          this.testFileNames = names.api
          break;
        }
        case'DATABASE':{
          this.testType = "DATABASE"
          names.database = JSON.parse(names.database);
          this.testFileNames = names.database;
          break;
        }
        case'LOAD':{
          this.testType = "LOAD"
          names.load = JSON.parse(names.load);
          this.testFileNames = names.load;
          break;
        }
      }
    },()=>{},()=>{
        this.disableStopBtn = new Array(this.getObjectKeys(this.testFileNames).length).fill(true);

    });
  }
    //HTML functions
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  updatePanelState(index: number, expanded: boolean) {
    this.panelExpanded[index] = expanded;
  }

  testFileNames:any= JSON.parse('{"test_login.py": ["test_google_title", "test_search_selenium"]}');
  loading: boolean[] = new Array(this.testFileNames.length).fill(false);
  panelExpanded:boolean[]= new Array(this.testFileNames.length).fill(false);
  logs:string[]= new Array(this.testFileNames.length).fill('');

  stopLoadTest(i:number){
    this.testService.stopLoadTest().subscribe(result=>{
      if(result){
        this.disableLoadBtn = false
        this.disableStopBtn[i] = true;
      }
    });
  }
  disableStopBtn:boolean[] = new Array(this.getObjectKeys(this.testFileNames).length).fill(true);
  disableLoadBtn:boolean = false
  runTestCase(i:number,fileName:string,event:MouseEvent) {
    event.stopPropagation();
    this.panelExpanded[i]  = true;
    this.loading[i]=true
    if(this.testType == "LOAD"){
      this.disableLoadBtn = true;
      this.disableStopBtn[i] = false;
    }
    this.testService.runTestByFile(this.testType,fileName).subscribe((data:any) =>{
      this.loading[i]=false;
      this.logs[i] = data.logs
      this.logService.showLogs(this.testType,this.logs[i])
    });
  }
}
