import { Component,OnInit } from '@angular/core';
import { TestCaseService } from '../services/test-case/test-case.service';
import { LogService } from '../services/log/log.service';

@Component({
  selector: 'app-type-of-test',
  templateUrl: './type-of-test.component.html',
  styleUrls: ['./type-of-test.component.scss']
})
export class TypeOfTestComponent implements OnInit{
  constructor(private testService: TestCaseService,private logService:LogService) { }
  apiCases: any;
  ngOnInit(): void {
    
  }
    testTypes:string[] = ["UI", "Database", "Api", "Load"];
   
    panelOpened:boolean = true;
    getPanelClass(className:string,i:number){
      return `${className}-${i}`;
    }

    updatePanelState(index: number, expanded: boolean) {
      this.panelExpanded[index] = expanded;
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
       this.logService.showLogs(i,this.logs[i])
      });
    }
    runAllTestCases(){
      this.testService.runAllTests().subscribe((data:any)=>{
        console.log(data)
      });
    }

}
