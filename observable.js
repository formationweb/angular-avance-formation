import { BehaviorSubject, Observable, AsyncSubject, Subject } from 'rxjs'

const ob$ = new AsyncSubject()

ob$.next('a')
ob$.next('b')

ob$.subscribe({
    next: console.log,
    err: console.log,
    complete: () => {
        console.log('terminé')
    }
})

ob$.next('c')
ob$.complete()