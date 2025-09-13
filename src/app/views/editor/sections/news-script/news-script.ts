import { Component, computed, inject, signal } from '@angular/core';
import { EditorService } from '../../../../services/splatfest/editor';
import { NewsSections } from '../../../../common/types/splatfest/news-sectios';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { Command } from "./command/command";
import { Languages } from '../../../../common/types/splatfest/languages';

@Component({
  selector: 'app-news-script',
  templateUrl: './news-script.html',
  styleUrl: './news-script.scss',
  imports: [CdkDropList, CdkDrag, Command],
})
export class NewsScript {
  #editor = inject(EditorService);

  #newsScript = this.#editor.festNewsScript;
  language = this.#editor.language;
  section = signal<NewsSections>(NewsSections.Announce);

  sectionScript = computed(() => {
    const script = this.#newsScript();
    const lang = this.language();
    const section = this.section();

    if (!script) return null;

    const scriptSection = script.News.find(s => s.NewsType === section);

    if (!scriptSection) return null; // No section found

    const sectionLang = scriptSection[lang];

    if (!sectionLang) return null;

    return sectionLang;
  })

  drop(event: CdkDragDrop<{ index: number }>) {
    const sectionScript = this.sectionScript();
    if (!sectionScript) return;

    moveItemInArray(sectionScript, event.previousIndex, event.currentIndex);
  }

  onLangChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as Languages;
    this.language.set(value);
  }

  onSectionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as NewsSections;
    this.section.set(value);
  }

}
