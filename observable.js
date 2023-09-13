import { interval, map, mergeMap, of, switchMap } from "rxjs";

const ob$ = interval(1000).pipe(
    switchMap((nb) => {
        console.log('---', nb)
        return interval(1000).pipe(
            map(() => Math.random())
        )
    })
)

ob$.subscribe(console.log)


//mergeMap(nb => of(nb * 2)) est égal à map(nb => nb * 2)