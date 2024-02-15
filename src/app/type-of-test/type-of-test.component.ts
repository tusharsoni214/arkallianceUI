import { Component } from '@angular/core';
import { TestCaseService } from '../test-case.service';

@Component({
  selector: 'app-type-of-test',
  templateUrl: './type-of-test.component.html',
  styleUrls: ['./type-of-test.component.scss']
})
export class TypeOfTestComponent {
  constructor(private testService: TestCaseService) { }

    testCases:string[] = ["UI Test Cases", "Database Test Cases", "Api Test Cases", "Load Test Cases"];
    panelOpened:boolean = true;
    getPanelClass(className:string,i:number){
      return `${className}-${i}`;
    }
    onButtonClick(event: MouseEvent) {
      event.stopPropagation();
      this.testService.runDatabaseTests().subscribe(res=>{
        console.log(res);
        alert("Database test ran successfully "+res);
      });
      // Add any additional button click logic here
    }
}
