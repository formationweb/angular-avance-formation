import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChange = (color: string) => void;
type OnTouched = () => void;

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [],
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorComponent),
      multi: true
    },
  ]
})
export class ColorComponent implements ControlValueAccessor {
  private _color = '';
  private onChange: OnChange = () => {};
  private onTouched: OnTouched = () => {};

  writeValue(color: string): void {
    this._color = color;
    this.onChange(color);
  }

  registerOnChange(fn: OnChange): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouched): void {
    this.onTouched = fn;
  }
}
