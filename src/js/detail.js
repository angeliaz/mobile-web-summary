import '../css/detail.css';

// 找到字符串中重复次数最多的字符
function findMax(str) {
  let maxChar = '';
  let maxValue = 1;

  if (!str.length) return;
  let arr = str.replace(/\s/g, '').split('');
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = 1;
    } else {
      obj[arr[i]]++;
    }
  }
  let keys = Object.keys(obj);
  for (let j = 0; j < keys.length; j++) {
    if (obj[keys[j]] > maxValue) {
      maxValue = obj[keys[j]];
      maxChar = keys[j];
    }
  }

  return {
    maxChar, maxValue
  }
}

function findMax1() {
  let maxChar = '';
  let maxValue = 1;
  let h = {};
  if (!str.length) return;
  let arr = str.replace(/\s/g, '').split('');
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i];
    h[a] === undefined ? h[a] = 1 : h[a]++;
    if (h[a] > maxValue) {
      maxChar = a;
      maxValue = h[a];
    }
  }
  return {
    maxChar, maxValue
  }
}

function findMax2() {
  let maxChar = '';
  let maxValue = 1;
  if (!str.length) return;
  let arr = str.replace(/\s/g, '').split('');
  let obj = arr.reduce((acc, curVal) => {
    acc[curVal] ? acc[curVal]++ : acc[curVal] = 1;
    if (acc[curVal] > maxValue) {
      maxChar = curVal;
      maxValue = acc[curVal];
    }
    return acc;
  }, {}) 
  return {
    maxChar, maxValue
  }
}

/* 
  \d 任意一个数字，0~9 中的任意一个
  \w 任意一个字母或数字或下划线，也就是 A~Z,a~z,0~9,_ 中任意一个
  \s 包括空格、制表符、换页符等空白字符的其中任意一个
. 小数点可以匹配除了换行符（\n）以外的任意一个字符 
*/
function findMax3(str) {
  let maxChar = '';
  let maxValue = 1;
  if (!str.length) return;
  let arr = str.replace(/\s/g, '').split('');
  let obj = {};
  str.replace(/\s/g, '').replace(/(\w)/g, (word, p) => {
    obj[p] ? obj[p]++ : obj[p] = 1;
    if (obj[p] > maxValue) {
      maxValue = obj[p];
      maxChar = p;
    }
  });
  return {
    maxChar, maxValue
  }

}

function findMax4(str) {
  let maxChar = '';
  let maxValue = 1;
  if (!str.length) return;
  let arr = str.replace(/\s/g, '').split('');
  Array.prototype.getMost = function() {
    let obj = this.reduce((acc, cur) => {
      acc[cur] ? acc[cur]++ : acc[cur] = 1;
      acc.max = acc[cur] > acc.max ? acc[cur] : acc.max;
      acc.key = acc[cur] > acc.max ? cur : acc.key;
      return acc;
    }, {});
    return obj;
  }
  // return arr.getMost();
}

const str = 'this is a test 222222 ts project. skajdf; 234222sdfadssldjfwel p'

const reducer = (accumulator, currentValue, b, c) => {
  let obj = {};
  obj[b] = currentValue;
  return obj;
}
const array1 = [1, 2, 3, 4];
// console.log(array1.reduce(reducer));

console.log(findMax(str));
console.log('findMax1', findMax4(str));

/**
 * 输入一个整形数组，数组里有正数也有负数。数组中连续的一个或多个整数组成一个子数组，每个子数组都有一个和。 求所有子数组的和的最大值，要求时间复杂度为O(n)。
 */
function findMaxSubArr(arr) {
  console.log(arr)
  let max = arr[0];
  let currSum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (currSum < 0) {
      currSum = arr[i];
    } else {
      currSum += arr[i]; 
    }
    if (currSum > max) {
      max = currSum;
    }
  }
  return max;
}

// console.log('maxsubarr', findMaxSubArr([1, -2, 3, 10, -4, 7, 2, -5]));

// 输出结果
console.log('begin');
setTimeout(() => {
  console.log('settimeout 1')
  Promise.resolve().then( () => {
    console.log('promise 1')
    setTimeout(() => {
      console.log('settimeout 2');
    });
  }).then(() => {
    console.log('promise 2');
  })
}, 0);
console.log('end');

/**
 * 类数组转成数组
 */
const nodes = document.querySelectorAll('div');
// nodes.map(item => {});

// 1.for直接遍历

// 2.这种方法是借用了数组原型中的slice方法，返回一个数组
Array.prototype.slice.call(nodes).map(item => {});
[].slice.call(nodes).map(item => {console.log()});

// 3.Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。
Array.from(nodes).map(item => {})

// 4.同样是ES6中新增的内容，扩展运算符（…）也可以将某些数据结构转为数组
const nodeList = [...nodes];
function getlist(a,b,c,d) {
  // console.log(arguments);
  // console.log([...arguments][0])
}
getlist(11, 2, 3, 4);

// 使用reduce方法实现forEach、map、filter
const arr1 = [12, 21, 3];
const arr2 = arr1.map(function(item) {
  // console.log(this, item)
  return item*2
}, { msg: 'mapping' })
// console.log(arr1, arr2)

// github上的
Array.prototype.selfMap = function () {
  const ary = this
  const result = []
  const [ fn, thisArg ] = [].slice.call(arguments)
  if (typeof fn !== 'function') {
    throw new TypeError(fn + 'is not a function')  
  }
  for (let i = 0; i < ary.length; i++) {
    result.push(fn.call(thisArg, ary[i], i, ary))
  }
  return result
}

Array.prototype.reduceMap = function (fn, thisArg) {
  // return (list) => {
      // 不怎么愿意写下面这两个判断条件
      const list = this
      if (typeof fn !== 'function') {
          throw new TypeError(fn + 'is not a function')  
      }
      if (!Array.isArray(list)) {
          throw new TypeError('list must be a Array')
      }
      if (list.length === 0) return []
      return list.reduce((acc, value, index) => {
          return acc.concat([ fn.call(thisArg, value, index, list) ])
      }, [])
  // }
}

// mine
Array.prototype.imitateMap = function () {
  const list = this;
  const result = []
  const [fn, thisArg] = [].slice.call(arguments)
  if (typeof fn !== 'function') {
    throw new TypeError(fn + 'is not a function');
  }
  for (let i = 0; i < list.length; i++) {
    result.push(fn.call(thisArg, list[i], i, list));
  }
  return result;
}

Array.prototype.imitateReduceMap = function () {
  const list = this;
  const result = []
  const [fn, thisArg] = [].slice.call(arguments)
  if (typeof fn !== 'function') {
    throw new TypeError(fn + 'is not a function');
  }
  if (!Array.isArray(list)) {
    throw new TypeError(list + 'is not a Array');
  }
  return list.reduce((acc, curValue, index) => {
    return acc.concat([fn.call(thisArg, curValue, index, list)]);
  }, [])
}

const imitateReduceMap1 = function (fn, thisArg) {
  return (list) => {
    const result = []
    if (typeof fn !== 'function') {
      throw new TypeError(fn + 'is not a function');
    }
    if (!Array.isArray(list)) {
      throw new TypeError(list + 'is not a Array');
    }
    return list.reduce((acc, curValue, index) => {
      return acc.concat([fn.call(thisArg, curValue, index, list)]);
    }, [])
  }
}

console.log('imitateMap', arr1, arr1.imitateMap(function(item) {
  console.log('imitateMap this', this)
  return item + 1
}, { msg: 'mapping' }) )
console.log('imitateReduceMap', [ 1, 2, 3 ].imitateReduceMap(x => x + 1));
console.log('imitateReduceMap1', imitateReduceMap1(x => x + 1)([ 1, 2, 3 ]));


/**
 * 实现repeat方法
 */
function repeat(func, times, wait) {
  return (str) => {
    let count = 0;
    const timer = setInterval(() => {
      if (count < times) {
        // func.call(this, str);
        count++;
      } else {
        clearInterval(timer);
      }
      
    }, wait);
  }
}

const repeatFunc = repeat(alert, 3, 2000)

repeatFunc('helloworld');

/**
 * 实现一个简单的双向绑定
 * 1.发布-订阅模式
 * 2.脏值检测
 * 3.数据劫持
 * Vue.js 采用的是 数据劫持+发布/订阅模式 的方式，通过 Object.defineProperty() 来劫持各个属性的 setter/getter， 在数据变动时发布消息给订阅者（Wacther）, 触发相应的监听回调
 */
// 基于Object.defineProperty 实现数据劫持，利用了对Vue.js实现双向绑定的思想
const obj = {}
Object.defineProperty(obj, 'txt',{
  get:function(){
    return obj
  },
  set:function(newValue){
    document.getElementById('txt').value = newValue
    document.getElementById('show-txt').innerHTML = newValue
  }
})
document.addEventListener('keyup', function(e){
  obj.txt = e.target.value
})



