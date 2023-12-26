import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { io } from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';

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
  chats!: any[]
  socket: any
  chatData: any

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  
  constructor(private userService: UserService,  private activatedRoute: ActivatedRoute,){

    this.socket = io('http://localhost:3000');
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