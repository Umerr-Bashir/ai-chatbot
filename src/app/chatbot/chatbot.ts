import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Gemini } from '../services/gemini';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  imports: [ CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})

export class Chatbot {
  constructor(
    private gemini: Gemini
  ){}


  userInput = '';
  botReply = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];

  sendMessage() {
  if (!this.userInput.trim()) return;

  const userMsg = this.userInput;
  this.messages.push({ text: userMsg, sender: 'user' });
  this.userInput = '';

  const placeholderIndex = this.messages.push({ text: 'Thinking...', sender: 'bot' }) - 1;
  console.log('Placeholder Index: ',placeholderIndex)

  // API Call
  this.gemini.sendMessage(userMsg).then(botReply => {
    this.messages[placeholderIndex].text = botReply;

  }).catch(err => {
    console.error('API error:', err);
    this.messages[placeholderIndex].text = 'Error connecting to AI';
  });
}
}
