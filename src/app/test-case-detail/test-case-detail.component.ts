import { Component, Input, OnInit } from '@angular/core';
import { TestCaseService } from '../test-case.service';

@Component({
  selector: 'app-test-case-detail',
  templateUrl: './test-case-detail.component.html',
  styleUrls: ['./test-case-detail.component.scss']
})
export class TestCaseDetailComponent implements OnInit{
  constructor(private testService: TestCaseService){}
  @Input() caseType:string='';
  apiCases:any;
  uiCases:any;
  databaseCases:any;
    ngOnInit(): void {
      if(this.caseType.toUpperCase().includes('UI')){
        this.testService.getUITestNames().subscribe(names => {
          console.log(names);
          this.testCases = names
        });
      }
      if(this.caseType.toUpperCase().includes('API')){
        this.testService.getAPITestNames().subscribe(names => {
          console.log(names);
          this.testCases = names
        });
      }
      if(this.caseType.toUpperCase().includes('DATABASE')){
        this.testService.getDataBaseTestNames().subscribe(names => {
          console.log(names);
          this.testCases = names
        });
      }
    }
    getCases(){
      this.testService.getAPITestNames().subscribe(names => {
        this.apiCases = names
      });
      this.testService.getDataBaseTestNames().subscribe(names => {
        this.databaseCases = names
      });
      this.testService.getUITestNames().subscribe(names => {
        this.uiCases = names
      });
    }
    testCases:any= ['Test Case 1','Test Case 2','Test Case 3','Test Case 4'];
    panelOpened:boolean = true;
    onButtonClick(event: MouseEvent) {
      event.stopPropagation();
      // Add any additional button click logic here
    }
}
