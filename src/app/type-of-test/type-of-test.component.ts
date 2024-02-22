import { Component,OnInit } from '@angular/core';
import { TestCaseService } from '../services/test-case/test-case.service';
import { LogService } from '../services/log/log.service';
import { HotToastService } from '@ngneat/hot-toast';
import OpenAI from "openai";
@Component({
  selector: 'app-type-of-test',
  templateUrl: './type-of-test.component.html',
  styleUrls: ['./type-of-test.component.scss']
})
export class TypeOfTestComponent implements OnInit{
  allLoading: boolean = false;
  constructor(private testService: TestCaseService,private logService:LogService,private toast: HotToastService) { }
  apiCases: any;
  openai:any
  ngOnInit(): void {
    this.testService.cleanReport().subscribe();
  }
    testTypes:string[] = ["UI", "Database", "Api", "Load"];
   
    panelOpened:boolean = true;
    getPanelClass(className:string,i:number){
      return `${className}-${i}`;
    }
    updatePanelState(index: number, expanded: boolean) {
      this.panelExpanded[index] = expanded;
    }
    generateReport(){
      this.testService.generateReport().subscribe(result=>{
        console.log(result);
        if(result){
          this.toast.success("Report generated successfully")
        }else{
          this.toast.error("An error occured while generating the reports");
        }
      });
    }

    cleanReport(){
      this.testService.cleanReport().subscribe(result=>{
        if(result){
          this.toast.success("Report cleaned successfully")
        }else{
          this.toast.error("An error occured while cleaning the reports");
        }
      });
    }
    loading: boolean[] = new Array(this.testTypes.length).fill(false);
    logs:string[]= new Array(this.testTypes.length).fill('');
    panelExpanded:boolean[]= new Array(this.testTypes.length).fill(true);
    testType:string = '';
    runTestCase(i:number,testType:string,event:MouseEvent) {
      event.stopPropagation();
      this.loading[i]=true;
      this.panelExpanded[i]  = true;
      this.testService.runTest(testType).subscribe((data:any)=>{
        this.loading[i]=false;
        this.logs[i] = data.logs
        this.toast.success(data.message);
       this.logService.showLogs(testType,this.logs[i])
      });
    }
  //  async runAllTestCases(){
  //   try {
  //     const stream = await this.openai.chat.completions.create({
  //         model: "gpt-3.5-turbo",
  //         messages: [{ role: "user", content: "Helloooo" }],
  //     });
  //     console.log(await stream);
  // } catch (error) {
  //     console.error("Error occurred:", error);
  // }
   
  //   }
    runAllTestCases(){
      this.allLoading = true;
      this.testService.runAllTests().subscribe((data:any)=>{
        this.allLoading = false;
        data.logs = JSON.parse(data.logs);
        this.toast.success(data.message);
        this.logService.showLogs("UI", data.logs.UI)
        this.logService.showLogs("API", data.logs.API)
        this.logService.showLogs("DATABASE", data.logs.DATABASE)
      });
    }

}
