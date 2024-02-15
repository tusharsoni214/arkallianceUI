import { Component,OnInit } from '@angular/core';
import { TestCaseService } from '../test-case.service';

@Component({
  selector: 'app-type-of-test',
  templateUrl: './type-of-test.component.html',
  styleUrls: ['./type-of-test.component.scss']
})
export class TypeOfTestComponent implements OnInit{
  constructor(private testService: TestCaseService) { }
  apiCases: any;
  ngOnInit(): void {
    
  }
    testCases:string[] = ["UI Test Cases", "Database Test Cases", "Api Test Cases", "Load Test Cases"];
   
    panelOpened:boolean = true;
    getPanelClass(className:string,i:number){
      return `${className}-${i}`;
    }

   
    typeLogs(logs: string, index: number, logElement: HTMLElement) {
      if (index < logs.length) {
        if (logs[index] === '\n') {
          logElement.appendChild(document.createElement('br')); 
        } else {
          logElement.innerText += logs[index]; 
        }
        index++;
        setTimeout(() => this.typeLogs(logs, index, logElement), 5); 
      }
    }
    showLogs(index: number, logs: string) {
      const logElement = document.getElementById('logBox' + index); 
      if (logElement) {
        logElement.innerText = ''; // Clear existing content
        this.typeLogs(logs, 0, logElement);
      }
    }
    updatePanelState(index: number, expanded: boolean) {
      this.panelExpanded[index] = expanded;
    }
    loading: boolean[] = new Array(this.testCases.length).fill(false);
    logs:string[]= new Array(this.testCases.length).fill('');
    panelExpanded:boolean[]= new Array(this.testCases.length).fill(true);
    runTestCase(i:number,caseName:string,event:MouseEvent) {
      event.stopPropagation();
      this.loading[i]=true;
      this.panelExpanded[i]  = true;
      switch (true) {
        case caseName.toUpperCase().includes("UI"):{
          this.testService.runUITests().subscribe((data:any)=>{
            this.loading[i]=false;
            this.logs[i] = data.logs
            // this.logs[i] = this.logs[i].replace(/\n/g, '<br>');
            this.showLogs(i,this.logs[i])
          });
          break;
        }
        case caseName.toUpperCase().includes("API"):{
          this.testService.runAPITests().subscribe((data:any)=>{
            this.loading[i]=false;
            this.logs[i] = data.logs
            // this.logs[i] = this.logs[i].replace(/\n/g, '<br>');
            this.showLogs(i,this.logs[i])
          });
          break;
        }
        case caseName.toUpperCase().includes("DATABASE"):{
          this.testService.runDatabaseTests().subscribe((data:any)=>{
            console.log(data)
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
