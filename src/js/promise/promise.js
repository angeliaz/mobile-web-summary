 async function dbFuc(db) {
  let docs = [{a:1}, {a:2}, {a:3}];
  let promises = docs.map((doc) => setTimeout(() => {
    // console.log(performance.now())
  }, 1000));

  let results = [];
  for (let promise of promises) {
    await promise;
  }
  console.log('dbFuc', results);
}

let a = 23333333333;

function user(params) {
  console.log('user23333');
}

function user1(params) {
  console.log('user11111');
}

console.log('promise init');
user();

/* dbFuc();

for (let item in [1,2,3]) {
  // console.log(item);
}

async function* gen1() {
  yield 'hello';
}
const genObj = gen1();
genObj.next().then(x => console.log(x));

function test1(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  })
}
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log('p2');reject(new Error('fail'))
  }, 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log('p1')
    resolve(p1)
  }, 1000)
})

p2
  .then(result => console.log('result', result))
  .catch(error => console.log('error', error))

let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

new Promise((resolve, reject) => {
  // throw new Error('test');
  console.log(2222);
  console.log(aaa + 1);
  resolve(11111);
}).then(r => {
  throw new Error('test11');
  console.log(123);
  return 3333;
  // console.log(aaa)
}).catch((err1, err2) => {console.error('err1', err1, err2);return 444})
.then(r2 => {console.log(r2);console.log(r22)})
.catch(err2 => {console.error('err2',err2)})
.finally(res => {console.log('fina', res);})

console.log('end~~~'); */

export const commentRestEndpoint = '/rest/comments';

export default {
  dbFuc,
  user
};
