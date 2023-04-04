import { Observable, Subject } from 'rxjs'

const ob$ = new Subject()

ob$.subscribe(console.log)
ob$.subscribe(console.log)

ob$.next(Math.random())
