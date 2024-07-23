import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject
} from '@angular/core';

@Component({
  selector: 'app-count',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './count.component.html',
  styleUrl: './count.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountComponent {
  private changeDetector = inject(ChangeDetectorRef);

  @Input() countObj!: { count: number; title: string };

  // ngDoCheck() {
  //   this.changeDetector.detectChanges()
  // }
}
