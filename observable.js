import { combineLatest, forkJoin, interval, map, mergeMap, of, switchMap } from "rxjs";

/*
const ob1$ = interval(1000)
const ob2$ = interval(1000).pipe(
    map(() => Math.random())
)

const ob3$ = combineLatest([ ob1$, ob2$ ])

ob3$.subscribe(console.log)
*/

const ob1$ = of(1, 2)
const ob2$ = of('a', 'b', 'c')

const ob3$ = forkJoin([ ob1$, ob2$ ])

ob3$.subscribe(console.log)

/*
const ob$ = interval(1000).pipe(
    switchMap((nb) => {
        console.log('---', nb)
        return interval(1000).pipe(
            map(() => Math.random())
        )
    })
)

ob$.subscribe(console.log)


//switchMap(nb => of(nb * 2)) est égal à map(nb => nb * 2)*/

/*
let subscription

interval(1000).subscribe((nb) => {
    console.log('---', nb)
    if (subscription) subscription.unsubscribe()
    subscription = interval(1000).pipe(map(() => Math.random())).subscribe((nb) => {
        console.log(nb)
    })
})
*/