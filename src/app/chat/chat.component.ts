import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GptService } from '../services/gpt/gpt.service';
import  {io} from 'socket.io-client';
import hljs from 'highlight.js';
import * as crypto from 'crypto-js'
import { isEmpty } from 'rxjs';

interface Message{
  owner: string;
  message: string;
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnDestroy  {
  constructor(private router:Router,private gpt:GptService){}
  loading : boolean = false;
  ngOnDestroy(): void {
    this.disconnectSocket()
  }
  socket:any
  ngOnInit(): void {
    this.connectSocket();
  }

  connectSocket(){
    this.socket = io("http://127.0.0.1:5000");
    let gptResponse:Message ={
      owner: "ArkGPT",
      message:''
    }
    this.socket.on("chat",(data:any)=>{
      gptResponse.message += data.toString()
        if(gptResponse.message.includes("overandout")){
          gptResponse.message = gptResponse.message.replace("overandout","");
          this.loading = false;
          if(gptResponse.message)
          this.chatMessages.push(gptResponse);
          setTimeout(() => {
            this.addListener(this.chatMessages[this.chatMessages.length-1].message)
          },0)
        }
    })
  }
  addListener(value: string) {
      if (value?.toLowerCase().includes('overandout')) {
          setTimeout(()=>{
            let id = crypto.MD5(value).toString();
            hljs.highlightAll();
            this.addEventListener(id);
          },0)
      }
  }
  addEventListener(id:string){
    let element = document.getElementById(`copy-button-${id}`)
    if(element){

      element.addEventListener('click', function () {
        var clipboard = this.getAttribute('clipboard-data') ?? '';
        const textarea = document.createElement('textarea');
        textarea.value = clipboard;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this.innerText = 'Copied!';
      });
    }
  }
  disconnectSocket(){
    this.socket.disconnect();
  }
  chatMessages:any[] = [];
  gptprompt: string = '';
  redirectToHome(){
    this.router.navigate(['/']);
  }
  autoResize(textarea: any) {
    if (textarea) {
      let scrollTop = textarea.scrollTop;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      textarea.scrollTop = scrollTop; // Restore scroll position
    }
  }
  sendMessageToGpt(){
    this.loading = true;
    let message:Message = {
      owner: "YOU",
      message: this.gptprompt
    };
    this.chatMessages.push(message)
    this.gpt.getGptResponse(this.gptprompt.toString(),"chat").subscribe(response=>{
  })

    this.gptprompt = ''
  }
}
