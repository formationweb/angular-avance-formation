import { Observable, BehaviorSubject,  ReplaySubject, AsyncSubject } from 'rxjs'


const ob$ = new AsyncSubject()

ob$.subscribe(console.log)

ob$.next('a')
ob$.next('b')
ob$.next('bbb')
ob$.next('c')
ob$.complete()
