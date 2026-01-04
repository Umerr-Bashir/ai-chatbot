import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Gemini {
  private API_KEY = environment.POE_API_KEY

  constructor(
    private http: HttpClient
  ){}

  sendMessage(message: string): Promise<string> {
  return fetch('https://api.poe.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${this.API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'Claude-Sonnet-4',
      messages: [
        { role: 'user', content: message }
      ]
    })
  })
  .then(res => res.json())
  .then(data => {
    // Poe OpenAI‑compatible responses return choices[0].message.content
    if (data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    }
    return "Sorry, no reply.";
  })
  .catch(err => {
    console.error("Poe API error:", err);
    return "Error connecting to AI";
  });
}
 

}
