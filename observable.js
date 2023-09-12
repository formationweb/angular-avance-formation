import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject, interval } from "rxjs";

const ob$ = interval(1000)

const subscription = ob$.subscribe(console.log)

subscription.unsubscribe()