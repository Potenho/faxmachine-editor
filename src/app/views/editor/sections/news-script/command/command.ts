import { Component, input } from '@angular/core';
import { AnyNewsCommands } from '../../../../../common/types/splatfest/news-commands';
import { IdolEmotions, Idols } from '../../../../../common/types/splatfest/idols';

@Component({
  selector: 'app-command',
  imports: [],
  templateUrl: './command.html',
  styleUrl: './command.scss'
})
export class Command {
  command = input.required<AnyNewsCommands>()

  getSpeaker(speaker: Idols) {
    switch (speaker) {
      case Idols.Callie: return "Callie";
      case Idols.Marie: return "Marie";
      case Idols.All: return "Callie & Marie";
      default: return "Unknown";
    }
  }

  getEmotion(emotion: IdolEmotions) {
    switch (emotion) {
      case IdolEmotions.Surprised: return "Surprised";
      case IdolEmotions.Feed: return "Talking to Idol";
      case IdolEmotions.Angry: return "Angry";
      case IdolEmotions.Happy: return "Happy";
      case IdolEmotions.Bored: return "Bored";
      case IdolEmotions.NormalTalk: return "Talking";
      case IdolEmotions.Wait: return "Waiting";
      case IdolEmotions.Greeting: return "Posing"
      default: return "Unknown";
    }
  }
}
