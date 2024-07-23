import { Observable, map, filter, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, combineLatest, forkJoin, timer, interval, of } from "rxjs";

/*
// const ob$ = new Observable((subscriber) => {
//   subscriber.next(Math.random());
//   setTimeout(() => {
//     subscriber.next(Math.random());
//   }, 2000);
// });

// ob$
//     .pipe(
//         map(nb => nb * 100),
//         filter(nb => nb <= 50)
//     )
//     .subscribe(console.log);

const ob$ = new Subject()

ob$.next('a')
ob$.next('b')


ob$.subscribe(console.log)

ob$.next('c')
ob$.next('d')

ob$.complete()

ob$.next('e')
*/

const ob1$ = timer(1000)
const ob2$ = of('test')

forkJoin([ ob1$, ob2$ ]).subscribe(console.log)