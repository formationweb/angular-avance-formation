let obj = {
    nb: 1
}

function foo(obj2) {
    obj2.nb = 2
    console.log(obj2)
}

foo(obj)
console.log(obj)