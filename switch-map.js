import { of, mergeMap, switchMap, map, interval } from "rxjs";

const ob1$ = interval(1000);
const ob2$ = interval(1000).pipe(map(() => Math.random()));


ob1$
  .pipe(
    switchMap((nb) => {
      console.log(nb);
      return ob2$;
    }),
  )
  .subscribe((randNb) => {
    console.log(randNb);
  });
  

  /*
let subscription;

ob1$.subscribe((nb) => {
  console.log(nb);
  if (subscription) {
    subscription.unsubscribe()
  }
    subscription = ob2$.subscribe((randNb) => {
      console.log(randNb);
    });
});
*/