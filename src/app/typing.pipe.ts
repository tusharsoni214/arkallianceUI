import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typing'
})
export class TypingPipe implements PipeTransform {

  transform(value: string): string {
    let result = '';
    value.split('').forEach((char, index) => {
      setTimeout(() => {
        result += char;
      }, index * 50); // Adjust typing speed (milliseconds)
    });
    return result;
  }

}
