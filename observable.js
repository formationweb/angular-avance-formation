import { combineLatest, forkJoin, interval, map, mergeMap, Observable, of, Subject, switchMap, tap } from 'rxjs'


const ob1$ = of(1)
const ob2$ = of('a')

ob1$.pipe(
    switchMap((nb) => {
        return ob2$
            .pipe(
                tap((letter) => {
                    console.log(nb, letter)
                })
            )
    })
).subscribe()