import { signal, computed, effect } from '@signe/reactive'





let count = signal(0)
let isEven = computed(() => count() % 2 == 0)

effect(() => {
    console.log(isEven())
})

count.set(count()+1)