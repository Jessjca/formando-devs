import { Component, ElementRef, Input, OnInit } from '@angular/core';

interface IContent {
  type: ContentType;
  name: string;
  href?: string;
  color?: string;
  hoverColor?: string;
  fragment?: ElementRef;
}

enum ContentType {
  HollowButton,
  FilledButton
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input('content')
  content: IContent[] = []

  GetHollowButtons(): IContent[] {
    return this.content.filter(content => content.type === ContentType.HollowButton)
  }
  GetFilledButtons(): IContent[] {
    return this.content.filter(content => content.type === ContentType.FilledButton)
  }

}
