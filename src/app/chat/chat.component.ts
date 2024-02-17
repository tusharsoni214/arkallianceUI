import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GptService } from '../services/gpt/gpt.service';


interface Message{
  owner: string;
  message: string;
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  constructor(private router:Router,private gpt:GptService){}
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
      let gptResponse:Message ={
        owner: "ArkGPT",
        message: response.toString()
      }
      this.chatMessages.push(gptResponse);
    })
    this.gptprompt = ''
  }
}
