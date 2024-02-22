import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'codeBlock'
})
export class CodeBlockPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}
  transform(value: string): string | SafeHtml{
   
    const codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/gs;
    console.log(codeBlockRegex.exec(value));
    let html = "     <div class='codeBlock'><div class='codeblock-heading'><span>$1</span><button id='copy-button' class='copy-button' clipboard-data='$2'>Copy code</button></div>"
    return this.sanitizer.bypassSecurityTrustHtml(value.replace(codeBlockRegex, `${html}<pre id='codeBlock' class=' language-python'><div class='code'><code>$2</code></div></pre></div>`));
  }

}