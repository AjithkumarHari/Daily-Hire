import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {
  senderId!: string
  receiverId!: string
  name!: string
  text: string = ''
  chats!: any[]
  socket: any

  @Input() data!: any;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  
  constructor(private userService: UserService){

    this.socket = io('http://localhost:3000');
    this.socket.on("connect", () => {
    });
    this.userService.onNewMessage().subscribe((message) => {
      this.chats.push(message);
    });
  }

  ngOnInit() {
    ({
      senderId: this.senderId,
      receiverId: this.receiverId,
      name: this.name
    } = this.data)
    this.userService.loadChats(this.senderId, this.receiverId).subscribe((res: any) => {
      this.chats = res.chats
    })
    console.log('scroll on init');
    this.scrollToBottom(); 
    
  }

  ngAfterViewInit() {
    console.log('scroll after init');
    
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
        this.scrollToBottom()
      })
    } else {
      return
    }
  }

  scrollToBottom(): void {
    console.log('scroll method');
    
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

}
