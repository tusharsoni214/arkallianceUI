import { Component } from '@angular/core';

@Component({
  selector: 'app-test-case-detail',
  templateUrl: './test-case-detail.component.html',
  styleUrls: ['./test-case-detail.component.scss']
})
export class TestCaseDetailComponent {
    testCases:string[] = ["Test Case 1", "Test Case 2", "Test Case 3", "Test Case 4"];
    panelOpened:boolean = true;
}
