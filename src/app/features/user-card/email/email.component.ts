import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  inject,
  Input,
} from '@angular/core';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [],
  template: `
    <p userEmail>{{ user.email }}</p>
    Nom enfant: {{ user.name }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent implements DoCheck {
  private cd = inject(ChangeDetectorRef);
  private previousEmail = '';
  @Input() user: User = {} as User;

  ngDoCheck(): void {
    if (this.previousEmail != this.user.email) {
      this.cd.markForCheck();
      this.previousEmail = this.user.email;
    }
  }
}
