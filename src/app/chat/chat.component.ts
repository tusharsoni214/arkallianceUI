import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GptService } from '../services/gpt/gpt.service';
import  {io} from 'socket.io-client';

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
  ngOnDestroy(): void {
    this.disconnectSocket()
  }
  socket:any
  ngOnInit(): void {
    this.connectSocket(); 
  }

  connectSocket(){
    this.socket = io("http://127.0.0.1:5000");
    this.socket.on("message",(data:any)=>{
      let gptResponse:Message ={
        owner: "ArkGPT",
        message: data.toString()
      }
      if(this.chatMessages[this.chatMessages.length-1].owner === "ArkGPT"){
        this.chatMessages[this.chatMessages.length-1].message += data.toString(); 
      }else{
        this.chatMessages.push(gptResponse);
      }
    })
  }
  disconnectSocket(){
    this.socket.disconnect();
  }
  chatMessages:any[] = [];
  gptprompt: string = '';
  redirectToHome(){
    this.router.navigate(['/']);
  }
  autoResize(textarea:any) {
    if(textarea){
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }
  sendMessageToGpt(){
    let message:Message = {
      owner: "YOU",
      message: this.gptprompt
    };
    this.chatMessages.push(message)
    this.gpt.getGptResponse(this.gptprompt.toString()).subscribe(response=>{
  })
   
    
    this.gptprompt = ''
  }
}
