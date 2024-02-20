import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'codeBlock'
})
export class CodeBlockPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}
  transform(value: string): string | SafeHtml{
    //learn this properly when you have time
    const codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/gs;
    let html = "<div class='codeblock-heading'><span>$1</span><button class='copy-button' (click)='copyCode()'>Copy code</button></div>"
    return this.sanitizer.bypassSecurityTrustHtml(value.replace(codeBlockRegex, `<pre id='codeBlock' class='codeBlock language-python'><div class='code'><code>$2</code></div></pre>`));
  }

}
