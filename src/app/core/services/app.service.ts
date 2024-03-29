import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _title$: BehaviorSubject<string> = new BehaviorSubject('Mon App') // state
  readonly title$: Observable<string> = this._title$.asObservable() // getter / selector

  constructor() { }

  setTitle(val: string) {
    this._title$.next(val) // mutation
  }
}
