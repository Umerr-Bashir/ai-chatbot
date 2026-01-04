import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chatbot } from "./chatbot/chatbot";
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [ Chatbot],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ai-chatbot');
}
