import {Component, HostListener} from '@angular/core';
import { environment } from './../environments/environment';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,

  SPACE = 32
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'va-target-counter';
  counter: number = 0;
  text: string = ''

  public increment(): void {
    if (this.counter < environment.max_value) {
      this.counter++;
    }

    if (environment.targets.hasOwnProperty(this.counter)) {
      // @ts-ignore
      this.text = environment.targets[this.counter];
    }
  }

  public decrement(): void {
    if (this.counter > 0) {
      this.counter--;
    }

    //search the next smaller text
    for (let i = this.counter; i >= 0; i--) {
      if (environment.targets.hasOwnProperty(i)) {
        // @ts-ignore
        this.text = environment.targets[i];

        break;
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.increment();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.decrement();
    }

    if (event.keyCode === KEY_CODE.SPACE) {
      this.increment();
    }
  }
}
