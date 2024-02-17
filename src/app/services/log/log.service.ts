import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }
  
  showLogs(testType: string, logs: string) {
    const logElement = document.getElementById('logBox' + testType); 
    if (logElement) {
      logElement.innerText = ''; // Clear existing content
      this.typeLogs(logs, 0, logElement);
    }
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
 
}
