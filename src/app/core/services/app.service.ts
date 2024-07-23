import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _title$ = new BehaviorSubject('Mon App') // state
  title$ = this._title$.asObservable() // getter ou selector

  setTitle(value: string) {
    this._title$.next(value) // mutation
  }
}
