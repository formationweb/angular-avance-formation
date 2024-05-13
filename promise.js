function rand() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(Math.random())
            resolve()
        }, 1000)
    })
}

async function run() {
    try {
        await rand()
        rand()
        console.log('done')
    }
    catch (err) {
        console.log('error')
    }
}

run()