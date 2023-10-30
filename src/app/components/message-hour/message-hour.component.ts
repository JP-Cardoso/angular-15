import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-hour',
  templateUrl: './message-hour.component.html',
  styleUrls: ['./message-hour.component.scss']
})
export class MessageHourComponent implements OnInit {

  @Output() messageHour = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.message()
  }

  message() {
    let hour = new Date().getHours();
    switch (true) {
      case hour <= 5:
        this.eventMessage('Boa Madrugada!');
        break;
      case hour < 12:
        this.eventMessage('Bom Dia!');
        break;
      case hour >= 12 && hour <= 18:
        this.eventMessage('Boa Tarde!');
        break;
      default:
        this.eventMessage('Boa Noite!');
        break;
    }

  }

  eventMessage(msg: string) {
    this.messageHour.emit(msg);
  }
}


/**
 * Trabalhar Output Properties - Do Filho para o Pai
 * Ex: 
 *  - Menu (Pai)
 *      - Message-Hour (filho)
 */