import { Component, ElementRef, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { TestCaseService } from '../services/test-case/test-case.service';
import { LogService } from '../services/log/log.service';
import { io } from 'socket.io-client';
import { GptService } from '../services/gpt/gpt.service';
import hljs from 'highlight.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  constructor(private testService: TestCaseService,private logService:LogService,private gpt:GptService,private sanitizer: DomSanitizer) {}

  ngOnDestroy(): void {
    this.disconnectSocket()
  }
  socket:any
  ngOnInit(): void {
    this.connectSocket();
    console.log("Filename",this.testFunctions)
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
  suggestedCode:Map<string,SafeHtml> = new Map<string,SafeHtml>()
  suggestFunction:string=''

 
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
  copyCode(){
    console.log("copyCode");
  }
  connectSocket(){
    if(!this.socket){
      this.socket = io("http://127.0.0.1:5000");
      this.socket.on("message",(data:any)=>{
        const codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/gs;
        let html = "     <div class='codeBlock'><div class='codeblock-heading'><span>$1</span><button id='copy-button' class='copy-button' clipboard-data='$2'>Copy code</button></div>"
    
        let sanitizedCode:SafeHtml = (this.suggestedCode.get(this.suggestFunction) + data.toString()).replace(codeBlockRegex, `${html}<pre id='codeBlock' class=' language-python'><div class='code'><code>$2</code></div></pre></div>`);

        this.suggestedCode.set(this.suggestFunction,sanitizedCode)
        //  += data.toString(); 
        let value :string = this.sanitizer.sanitize(0,this.suggestedCode.get(this.suggestFunction)??'')??''
        if(value?.toLowerCase().includes("overandout")){

          let finalcode:string = value?.split('overandout')[0]??''
          this.suggestedCode.set(this.suggestFunction,this.sanitizer.bypassSecurityTrustHtml(finalcode))
          hljs.highlightAll();
            document.getElementById('copy-button')?.addEventListener('click',function(){
                var clipboard = this.getAttribute('clipboard-data')??'';
                const textarea = document.createElement('textarea');
                  textarea.value = clipboard;
                  document.body.appendChild(textarea);
                  textarea.select();
                  document.execCommand('copy');
                  document.body.removeChild(textarea);
                  this.innerText = 'Copied!';
                console.log(clipboard);
        })
        }
       
      })
    }
  }
  suggestCode(i: number, fileName: string,functionName:string, event: MouseEvent) {
    event.stopPropagation();
    this.panelExpanded[i] = true;
    this.loading[i] = true;
    this.suggestFunction = functionName;
    this.suggestedCode.set(functionName, '')
    this.testService.getFunctionSourceCode(fileName, functionName).subscribe((data:any)=>{
      let gptprompt = `This is my test case ${data} can you please look for any error/optimization and provide me new code`
      this.gpt.getGptResponse(gptprompt.toString()).subscribe(response=>{
        this.loading[i]=false;
       
    })
    });
  }
}
