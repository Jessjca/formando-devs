import { Component } from '@angular/core';

@Component({
  selector: 'share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButton {
  CopyLink() {
    navigator.clipboard.writeText(window.location.href);
  }
}
