import { signal, effect, computed } from '@signe/reactive'








const count = signal(0)
const isEven = computed(() => count() % 2 == 0)
const color = signal('red')

effect(() => {
    console.log(isEven())  
})

// effect(() => {
//     console.log(color())
// })

count.set(1)
count.set(2)