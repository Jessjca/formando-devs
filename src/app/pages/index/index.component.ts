import { Component, ElementRef, ViewChild } from '@angular/core';
import { IndexExplanation } from 'src/app/components/index/index-explanation/index-explanation.component';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  @ViewChild('about', { static: true, read: ElementRef }) about!: ElementRef
  ScrollAbout() {
    console.log(this.about.nativeElement)
  }
}
