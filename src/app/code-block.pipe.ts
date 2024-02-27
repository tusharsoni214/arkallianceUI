import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as crypto from 'crypto-js'
@Pipe({
  name: 'codeBlock'
})
export class CodeBlockPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}
  transform(value: string): string | SafeHtml{
   
    const codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/gs;
    let html = "<div class='codeBlock'><div class='codeblock-heading'><span>$1</span><button id='copy-button' class='copy-button' clipboard-data='$2'>Copy code</button></div>"
    let _value = value
    if(value.includes("overandout")){
      let id = crypto.MD5(value).toString();
      html = `<div class='codeBlock'><div class='codeblock-heading'><span>$1</span><button id='copy-button-${id}' class='copy-button' clipboard-data='$2'>Copy code</button></div>`
      _value = value.replace(codeBlockRegex, `${html}<pre id='codeBlock' class=' language-python'><div class='code'><code>$2</code></div></pre></div>`)

    }else{

      _value = value.replace(codeBlockRegex, `${html}<pre id='codeBlock' class=' language-python'><div class='code'><code>$2</code></div></pre></div>`)
    }
    _value = value.replace('overandout','')
    return this.sanitizer.bypassSecurityTrustHtml(_value);
  }

}