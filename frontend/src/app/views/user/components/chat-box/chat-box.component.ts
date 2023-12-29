import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { io } from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {
  senderId!: any
  receiverId!: any
  name!: any
  text: string = ''
  chats: any[] = []
  socket: any
  chatData: any
  site = environment.siteUrl;

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  
  constructor(private userService: UserService,  private activatedRoute: ActivatedRoute,){

    this.socket = io(this.site);
    this.socket.on("connect", () => {
    });
    this.userService.onNewMessage().subscribe((message) => {
      this.chats.push(message);
    });
  }

  ngOnInit() {
 
    this.name = this.activatedRoute.snapshot.paramMap.get('name')
    this.receiverId = this.activatedRoute.snapshot.paramMap.get('receiverId')
    this.senderId = this.activatedRoute.snapshot.paramMap.get('senderId') 
    this.userService.loadChats(this.senderId, this.receiverId).subscribe((res: any) => {
      if( res.chats)
      this.chats = res.chats
    })
    this.scrollToBottom(); 
    
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  

  sendMessage(text: string) {
    const trimmedText = text.trim();

    if (trimmedText !== '') {
      const data = {
        senderId: this.senderId,
        receiverId: this.receiverId,
        content: trimmedText
      }

      this.userService.sendChat(data).subscribe((res) => {
        this.text = ''
        if(this.chats.length == 0){
          this.userService.loadChats(this.senderId, this.receiverId).subscribe((res: any) => {
            if( res.chats)
            this.chats = res.chats
          })
        }
        this.scrollToBottom()
      })
    } else {
      return
    }
  }

  scrollToBottom(): void {
    // console.log('scroll method');
    
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

}
