import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import  {io} from 'socket.io-client';
import { GptService } from '../services/gpt/gpt.service';
import { TestCaseService } from '../services/test-case/test-case.service';
import { HotToastService, Toast } from '@ngneat/hot-toast';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {
  constructor(private toast: HotToastService,  @Inject(MAT_DIALOG_DATA) public data: any,private gpt:GptService,private testService:TestCaseService,private dialogRef: MatDialogRef<AddTestComponent>) { }
  selectedFile:string = '';
  newFileName:string = '';
  text_editor_code = 'def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n - 1)\n\n# Test the function\nnumber = 5\nprint(f"The factorial of {number} is {factorial(number)}")\n'

  ngOnInit(): void {
    this.connectSocket();
    this.files = this.data.Files
    switch(this.data.testType.toUpperCase()){
      case'UI':{
        this.fileNames = JSON.parse(this.data.Files.ui);
        break;
      }
      case'API':{
        this.data.testType = "API";
        this.fileNames = JSON.parse(this.data.Files.api);
        break;
      }
      case'DATABASE':{
        this.data.testType = "DATABASE"
        this.fileNames =  JSON.parse(this.data.Files.database);
        break;
      }
      case'LOAD':{
        this.data.testType = "LOAD"
        this.fileNames = JSON.parse(this.data.Files.load);
        break;
      }
    }
    console.log(this.fileNames)
  }
  fileNames:any[] = [];
  files:any;
  gptprompt:any;
  socket:any
  gptCode:string ='';
  tempRes:string = '';
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  connectSocket(){
    this.socket = io("http://127.0.0.1:5000");
    this.socket.on("addTestCase",(data:any)=>{
      this.tempRes +=data.toString();
      if(this.tempRes.includes('overandout')){
        this.tempRes.replace('overandout','');
        const codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/gs;
        if(this.tempRes.includes("```")){

          this.gptCode = codeBlockRegex.exec(this.tempRes)?.[2]??''
        }else{
          this.gptCode = this.tempRes
        }
        this.tempRes = '';
      }
  });
}
  autoResize() {
    let textarea = document.getElementById('chat-textarea');
    if (textarea) {
      let scrollTop = textarea.scrollTop;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      textarea.scrollTop = scrollTop; // Restore scroll position
    }
  }
  cancel(){

  }
  selectedTabIndex:number = 0
  save(){
    if(!this.selectedFile){
      this.toast.error("No File is selected")
      return;
    }
    if(this.selectedFile === "new" && this.newFileName == ""){
      this.toast.error("Please enter a new file name")
      return;
    }
    let fileName = '';
    let code = '';
    if(this.selectedFile === "new"){
      fileName = this.newFileName;
    }else{
      fileName = this.selectedFile;
    }
    if(this.selectedTabIndex == 0){
      code = this.gptCode;

    }else{
      code = this.text_editor_code
    }
    this.testService.addTestCase(this.data.testType.toUpperCase(),fileName,code).subscribe(res=>{
      this.toast.success("Test added successfully")
      this.dialogRef.close();
    })
  }
  onCodeChange(newCode:string){
    let code = '';
    if(this.selectedTabIndex == 0){
      this.gptCode = newCode;

    }else{
      this.text_editor_code = newCode
    }
  }
  sendMessageToGpt(event: MouseEvent|Event){
    let prompt = this.gptprompt
    this.gptprompt=''
    this.autoResize();
    event.stopPropagation();
    this.gpt.getGptResponse(prompt.toString(),"addTestCase").subscribe(response=>{
        this.gptprompt = '';

    })
  
  }
}
