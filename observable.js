import { switchMap, mergeMap, of, interval, map } from 'rxjs'

const ob1$ = of(1, 2, 3)

ob1$.pipe(
    // map((nb) => {
    //     return nb * 2
    // })
    switchMap((nb) => {
        return of(nb * 2)
    })
).subscribe(console.log)

