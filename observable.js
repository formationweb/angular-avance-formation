import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";

const ob$ = new AsyncSubject()

ob$.next('a')
ob$.next('b')

ob$.subscribe(console.log)

ob$.next('c')
ob$.complete()