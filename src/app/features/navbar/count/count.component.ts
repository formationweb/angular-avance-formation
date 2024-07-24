import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-count',
  standalone: true,
  imports: [JsonPipe],
  template: ` <h1>{{ countObj | json }} - {{ count() }}</h1> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountComponent implements DoCheck {
  private changeDetector = inject(ChangeDetectorRef);
  @Input() countObj!: { count: number; title: string };
  count = signal(0)

  ngDoCheck(): void {
    this.count.set(this.countObj.count)
    //this.changeDetector.detectChanges()
  }
}
