import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChangeFn = (color: string) => void

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorComponent),
      multi: true
    }
  ]
})
export class ColorComponent implements ControlValueAccessor {
  private color: string = ''
  private onChange: OnChangeFn = () => {}
  private onTouched: () => void = () => {}

  writeValue(color: string) {
     this.color = color
     this.onChange(color)
  }

  registerOnChange(fn: OnChangeFn): void {
      this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
      this.onTouched = fn
  }
}
