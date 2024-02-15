import { Component } from '@angular/core';

@Component({
  selector: 'app-type-of-test',
  templateUrl: './type-of-test.component.html',
  styleUrls: ['./type-of-test.component.scss']
})
export class TypeOfTestComponent {
    testCases:string[] = ["UI Test Cases", "Database Test Cases", "Api Test Cases", "Load Test Cases"];
    panelOpened:boolean = true;
}
