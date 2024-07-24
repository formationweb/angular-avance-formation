import { interval, timer, take, exhaustMap, map } from 'rxjs';

const source = interval(50).pipe(take(5)); 
const result = source.pipe(
  exhaustMap(value => timer(2000))
);

result.subscribe(
  message => console.log(message),
  error => console.error('Erreur :', error),
  () => console.log('Toutes les opérations sont terminées')
);
