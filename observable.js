import { Observable, bufferTime, map, interval } from 'rxjs'

// const ob$ = new Observable((subscriber) => {
//   console.log("go");
//   setTimeout(() => {
//     subscriber.next("A");
//   }, 100);
//   setTimeout(() => {
//     subscriber.next("B");
//   }, 200);
//   setTimeout(() => {
//     subscriber.next("C");
//   }, 300);
//   setTimeout(() => {
//     subscriber.next("D");
//     subscriber.complete();
//   }, 3000);
// });

// ob$
//     .pipe(
//         bufferTime(400),
//         map(ev => ev.length)
//     )
//     .subscribe({
//       next: (nb) => {
//         console.log(nb)
//       },
//       error: (err) => {
//         console.log(err)
//       }
//     })


const count$ = interval(1000)

count$.subscribe((nb) => {
  console.log(nb)
})