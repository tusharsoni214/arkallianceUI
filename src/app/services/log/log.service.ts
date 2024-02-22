import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }
  
  showLogs(testType: string, logs: string) {
    const Element = document.getElementById('logBox' + testType.toUpperCase()); 
    if (Element) {
      Element.innerText = ''; // Clear existing content
      this.typeLogs(logs, 0, Element);
    }
  }
  typeLogs(logs: string, index: number, logElement: HTMLElement) {
    if (index < logs.length) {
      if (logs[index] === '\n') {
        logElement.appendChild(document.createElement('br')); 
      } else {
        logElement.innerHTML += logs[index]; 
      }
      index++;
      setTimeout(() => this.typeLogs(logs, index, logElement), 5); 
    }
  }
 
}
