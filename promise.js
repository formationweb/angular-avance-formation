function lancerDe(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("calcul terminé");
      const nb = Math.random();
      // resolve(nb);
      reject(new Error("erreur"));
    }, ms);
  });
}

/*lancerDe(1000).then((nb1) => {
    console.log(nb1)
    return lancerDe(1000)
}).then((nb2) => {
    console.log(nb2)
    return Promise.all([ lancerDe(1000), lancerDe(2000) ])
}).then((arrayNb) => {
    console.log(arrayNb)
}).catch((err) => {
    console.log(err)
})*/

async function foo() {
  try {
    const nb1 = await lancerDe(1000);
    const nb2 = await lancerDe(1000);
    const nb3 = await lancerDe(1000);
    console.log(nb1, nb2, nb3);
  } catch (err) {
    console.log('A', err)
    throw err
  }
}

foo()
  .then((str) => {
    console.log("terminé");
  })
  .catch(console.log);
