import { NgFor } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChangeFn = (color: string) => void
type OnTouchedFn = () => void

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="color-palette-container">
      <div class="color-palette">
        <button *ngFor="let color of colors" 
                [style.background]="getGradient(color)"
                (click)="writeValue(color)"
                [class.selected]="color === selectedColor">
        </button>
      </div>
      <button class="custom-color-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#4A4A4A"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .color-palette-container {
      background-color: #fff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .color-palette {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 12px;
      margin-bottom: 12px;
    }
    button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    button::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%);
    }
    button.selected {
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #333;
    }
    .custom-color-button {
      background-color: #fff !important;
      border: 2px dashed #4A4A4A;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    .custom-color-button::after {
      display: none;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorComponent),
      multi: true
    }
  ]
})
export class ColorComponent implements ControlValueAccessor {
  private color = ''
  private onChange: OnChangeFn = () => {}
  private onTouched: OnTouchedFn = () => {}
  selectedColor: string = '';
  colors: string[] = [
    '#E0E0E0', '#C0C0C0', '#4A4A4A', '#000000', '#9C27B0', '#00796B',
    '#1976D2', '#673AB7', '#FFC0CB', '#4CAF50', '#00BCD4', '#2196F3',
    '#FFEB3B', '#FFE4B5', '#A9A9A9', '#E6E6FA'
  ];

  getGradient(color: string): string {
    return `linear-gradient(135deg, ${color} 0%, ${color} 50%, ${this.darken(color)} 100%)`;
  }

  darken(color: string): string {
    const amt = -20;
    let usePound = false;

    if (color[0] == "#") {
      color = color.slice(1);
      usePound = true;
    }

    let num = parseInt(color, 16);
    let r = (num >> 16) + amt;
    let b = ((num >> 8) & 0x00FF) + amt;
    let g = (num & 0x0000FF) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
  }

  writeValue(color: string): void {
    this.selectedColor = color;
    this.onChange(color);
  }

  registerOnChange(fn: OnChangeFn): void {
    this.onChange = fn
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn
  }
}
