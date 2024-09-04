import { switchMap, mergeMap, of, interval, combineLatest, map, forkJoin } from "rxjs";

// const ob1$ = interval(1000).pipe(map(() => Math.random()));
// const ob2$ = interval(500);

const ob1$ = of(1, 2, 3)
const ob2$ = of('a', 'b', 'c')

//combineLatest([ ob1$, ob2$ ]).subscribe(console.log)

forkJoin([ob1$, ob2$]).subscribe(console.log)