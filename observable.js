import { of, mergeMap, switchMap, map, interval, combineLatest, forkJoin } from 'rxjs'

// const ob1$ = interval(500)
// const ob2$ = interval(1000).pipe(map(() => Math.random()))

const ob1$ = of('a', 'b')
const ob2$ = of(1, 2)

// combineLatest([ ob1$, ob2$ ]).subscribe((array) => {
//     console.log(array)
// })

forkJoin([ ob1$, ob2$ ]).subscribe((array) => {
    console.log(array)
})



// ob1$.pipe(
//     mergeMap((nb) => {
//         console.log('---', nb)
//         return ob2$
//     })
// ).subscribe((nbRand) => {
//     console.log(nbRand)
// })

// let subscription

// ob1$.subscribe((nb) => {
//     console.log('---', nb)
//     if (subscription) subscription.unsubscribe()
//     subscription = ob2$.subscribe((nbRand) => {
//         console.log(nbRand)
//     })
// })

/*
ob2$.pipe(
    //map(nb => nb * 2)
    mergeMap(nb => of(nb * 2))
).subscribe(console.log)
*/

