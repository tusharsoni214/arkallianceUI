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
        console.log(names);
        if(this.caseType.toUpperCase().includes('UI')){
          this.testCases = names.ui
        }
        if(this.caseType.toUpperCase().includes('API')){
          this.testCases = names.api
        }
        if(this.caseType.toUpperCase().includes('DATABASE')){
          this.testCases = names.database
        }
      });
    }
    testCases:any= ['Test Case 1','Test Case 2','Test Case 3','Test Case 4'];
    panelOpened:boolean = true;
    onButtonClick(event: MouseEvent) {
      event.stopPropagation();
      // Add any additional button click logic here
    }
}
