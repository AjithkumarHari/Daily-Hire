import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { io } from 'socket.io-client';
import { UserService } from 'src/app/views/user/services/user.service';
import { WorkerService } from '../../services/worker.service';

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
  chats: any[] = []
  socket: any

  @Input() data!: any;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  
  constructor(private workerService: WorkerService){

    this.socket = io('https://dailyhire.ajithkumarhari.co');
    this.socket.on("connect", () => {
    });
    this.workerService.onNewMessage().subscribe((message) => {
      this.chats.push(message);
    });

  }

  ngOnInit() {
    ({
      senderId: this.senderId,
      receiverId: this.receiverId,
      name: this.name
    } = this.data)
    if(this.data.senderId)
      this.workerService.loadChats(this.senderId, this.receiverId).subscribe((res: any) => {
        if( res.chats)
          this.chats = res.chats
      })
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.ngOnInit();
    }
  }

  sendMessage(text: string) {
    const trimmedText = text.trim();

    if (trimmedText !== '') {
      const data = {
        senderId: this.receiverId,
        receiverId: this.senderId,
        content: trimmedText
      }
      
      this.workerService.sendChat(data).subscribe((res) => {

        this.text = ''
        console.log('dadad');
        
        this.scrollToBottom();

      })
    } else {
      return
    }
  }

  scrollToBottom(): void {
    console.log('scroll');
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
}
