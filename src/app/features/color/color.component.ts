import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChangeFn = (color: string) => void
type OnTouchedFn = () => void

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [],
  template: `
    <div>
      @for (color of arrayColors ; track color) {
        <button type="button" (click)="writeValue(color)">{{ color }}</button>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorComponent),
      multi: true
    }
  ]
})
export class ColorComponent implements ControlValueAccessor {
  private _color: string = 'red'
  private onChangeFn: OnChangeFn = () => {}
  private onTouchedFn: OnTouchedFn = () => {}
  arrayColors: string[] = ['red', 'green', 'blue']

  writeValue(color: string): void {
    this._color = color
    this.onChangeFn(color)
  }

  registerOnChange(fn: OnChangeFn): void {
    this.onChangeFn = fn
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouchedFn = fn
  }
}
