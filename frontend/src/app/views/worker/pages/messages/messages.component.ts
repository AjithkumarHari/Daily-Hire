import { Component } from '@angular/core';
import { User } from 'src/app/types/User';
import { Worker } from 'src/app/types/Worker';
import { WorkerService } from '../../services/worker.service';
import { WorkerState } from '../../state/worker.state';
import { Store } from '@ngrx/store';
import { selectWorkerDetails } from '../../state/login/worker.login.selector';
import { ChatRoom } from 'src/app/types/ChatRoom';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  users!: User;
  worker!: Worker;
  chatRooms: ChatRoom[] = [];
  data = {
    senderId: '',
    receiverId: '',
    name: ''
  }

  constructor(private workerService: WorkerService, private store: Store<WorkerState>) {
  }

  ngOnInit(){
    this.store.select(selectWorkerDetails).subscribe((data)=>{
      this.worker = data;
      if(this.worker._id)
      this.workerService.loadChatMates(this.worker._id).subscribe((data: any)=>{
      if(data.chatRooms)
        this.chatRooms = data.chatRooms
    })
    })
  }

  onChatSelect(senderId: string, receiverId: string, userName: string){
    this.data = {
      senderId: senderId,
      receiverId: receiverId,
      name: userName
    }
  }

  chatData(){
    return this.data;
  }
  

}
