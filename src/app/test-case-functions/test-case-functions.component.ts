import { Component, Input, OnInit } from '@angular/core';
import { TestCaseService } from '../services/test-case/test-case.service';
import { LogService } from '../services/log/log.service';
import { io } from 'socket.io-client';
import { GptService } from '../services/gpt/gpt.service';

interface Message{
  owner: string;
  message: string;
}


@Component({
  selector: 'app-test-case-functions',
  templateUrl: './test-case-functions.component.html',
  styleUrls: ['./test-case-functions.component.scss'],
})
export class TestCaseFunctionsComponent implements OnInit {
  messages: any;
  constructor(private testService: TestCaseService,private logService:LogService,private gpt:GptService) {}

  ngOnDestroy(): void {
    this.disconnectSocket()
  }
  socket:any
  ngOnInit(): void {
    this.connectSocket();
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
  disconnectSocket(){
    this.socket.disconnect();
  }
  chatMessages:any[] = [];
  suggestedCode:string ='';
  connectSocket(){
    this.socket = io("http://127.0.0.1:5000");
    this.socket.on("message",(data:any)=>{
      this.suggestedCode += data.toString();
    })
  }
  runTestCaseByName(i: number, fileName: string,testName:string, event: MouseEvent) {
    event.stopPropagation();
    this.panelExpanded[i] = true;
    this.loading[i] = true;
    this.testService.runTestByTestName(this.testType,fileName, testName).subscribe((data:any)=>{
      this.loading[i]=false;
      this.logs[i] = data.logs
      this.logService.showLogs(this.testType,this.logs[i])
    });
  }
  suggestCode(i: number, fileName: string,testName:string, event: MouseEvent) {
    event.stopPropagation();
    this.panelExpanded[i] = true;
    this.loading[i] = true;
    this.testService.getFunctionSourceCode(this.testType,fileName, testName).subscribe((data:any)=>{
      this.loading[i]=false;
      let gptprompt = `This is my test case ${data} can you please look for any error/ optimization and provide me any sugesstion`
      this.gpt.getGptResponse(gptprompt.toString()).subscribe(response=>{
        console.log(response);
    })
    },()=>{},
    ()=>{





      }
    );
  }
}
