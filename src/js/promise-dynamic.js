import promise from './promise/promise.js';
import '../css/main.less';
import '../css/index.css';

// addImage.js
/* let smallImg = document.createElement('img')
// 必须 require 进来
smallImg.src = require('../images/newer.png')
// console.log(smallImg)
document.body.appendChild(smallImg) */

/* let bigImg = document.createElement('img')
bigImg.src = require('../images/big.jpeg')
document.body.appendChild(bigImg) */

let a = 23333;

function user(params) {
  console.log('user');
}

// 按需加载
document.getElementById('btn').onclick = () => {
  import(/* webpackChunkName: 'dynamic1' */'./dynamic.js')
  .then(module => {
  console.log(module.test('dynamic11111'))
  })
}

// promise.dbFuc();

console.log('index1111');
