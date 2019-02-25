/**
  给一个整数数组，找到两个数使得他们的和等于一个给定的数 target。
  你需要实现的函数twoSum需要返回这两个数的下标, 并且第一个下标小于第二个下标。注意这里下标的范围是 0 到 n-1
 * O(n) Space, O(nlogn) Time
 * O(n) Space, O(n) Time
 * @param numbers: An array of Integer
 * @param target: target = numbers[index1] + numbers[index2]
 * @return: [index1, index2] (index1 < index2)
 */

const twoSum = function(numbers, target) {
	let index2;
	for (let i = 0; i < numbers.length - 1; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			if (numbers[i] + numbers[j] === target) {
				index2 = j;
				break;
			}
		}
		if (index2) {
			index1 = i;
			break;
		}
	}
	return [index1, index2];
};

const twoSumByObj = function(numbers, target) {
  let arr = [];
  let obj = {};
  for (let i = 0; i < numbers.length; i++) {
    obj[target - numbers[i]] = i;
  }
  for (let j = 0; j < numbers.length; j++) {
    if (obj[numbers[j]] && j !== obj[numbers[j]]) {
      arr[0] = j > obj[numbers[j]] ? obj[numbers[j]] : j;
      arr[1] = j > obj[numbers[j]] ? j : obj[numbers[j]];
      break;
    }
  }
  return arr;
}

console.log('main test cases');
twoSumByObj([2,7,11,15], 26)

/**
 * 落单的数
 * 给出2*n + 1 个的数字，除其中一个数字之外其他每个数字均出现两次，找到这个数字。o
 * @param A: An integer array
 * @return: An integer
 */
const singleNumber = function (arr) {
  let val = 0;
  for (let i = 0; i < arr.length; i++) {
    val = val ^ arr[i];
  }
  return val;
}

console.log('singleVal', singleNumber([2,4,1,1,2]));

/**
 * 有效的括号序列
 */
const isValidParentheses = function (s) {
  let arr = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '{') {
      arr.push('}');
    } else if (s[i] === '[') {
      arr.push(']');
    } else if (s[i] === '(') {
      arr.push(')');
    } else if (arr.pop() !== s[i]) {
      return false;
    }
  }
  return !arr.length;
}

console.log('isvalidparent', isValidParentheses('}[({)]'))

/**
 * 快乐数
 * @param {*} num 
 */
const isHappy = function(num) {
  let str = num.toString();
  let obj = {};
  let sum = 0;
  let count = 0;
  while(sum !== 1) {
    if (count > 99) return false;
    sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += Math.pow(Number(str[i]), 2);
    }
    if (sum === 1) {
      return true;
    }
    obj[sum] = obj[sum] ? obj[sum] += 1 : obj[sum] = 1;
    if (obj[sum] > 1 || sum === num) {
      return false;
    }
    str = sum.toString();
    count++;
  }
  return true;
}
console.log('isHappy', isHappy(5));

/**
 * 查找数组是否包含任何重复项
 */
function isRepeat(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (obj[arr[i]]) {
      return true;
    }
    obj[arr[i]] = true;
  }
  return false;
}
console.log('isRepeat', isRepeat([1,2,3,4, 2]))

/**
 * 包含重复元素 II
 */
function containsNearbyDuplicate(nums, k) {
  let obj = {};
  for (let i = 0; i < nums.length; i++) {
    console.log(nums[i], obj[nums[i]], i)
    if (typeof obj[nums[i]] !== 'undefined' && i - obj[nums[i]] <= k) {
      return true;
    } else {
      obj[nums[i]] = i;
    }
  }
  return false;
}
console.log('containsNearbyDuplicate', containsNearbyDuplicate([1,2,3,1], 3))

function sumStr(a, b) {
  let res = '', c = 0;
  a = a.split('');
  b = b.split('');
  while(a.length || b.length || c) {
    c += ~~a.pop() + ~~b.pop();
    res = c % 10 + res;
    c = c > 9;
  }
  return res === '0' ? res : res.replace(/^0+/, '');
}
console.log('sumStr', sumStr('87', '5'));

/**
 * 重排
 * 给一列数组要求重排，必须所有偶数位上的数都小于所有奇数位上的数。同时，偶数位上的数也按照升序排序，奇数位上的也按照升序排序。
 */
function resort(arr) {
  let newArr = [];
  arr.sort((a, b) => {return a - b});
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      newArr[i] = arr[i / 2];
    } else {
      newArr[i] = arr[Math.floor((arr.length - 1) / 2) + Math.ceil(i / 2)];
    }
  }
  return newArr;
}
console.log('resort', resort( [-1,0, 1,-1,5,0]))

/**
 * 数组去重
 */
function unique(arr) {
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    if (temp.indexOf(arr[i]) === -1) {
      temp.push(arr[i]);
    }
  }
  return temp;
}

function unique1(arr) {
  let obj = [];
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = 1;
  }
  return Object.keys(obj);
}

console.log('unique', unique([ 1, 2, 1, 2, '1', '11']));
console.log('unique1', Array.from(new Set([1,2,3,1])))

/**
 * 数组排列成父子树的形式
 */

function translateDataToTree(data) {
  let parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null)
  let childrens = data.filter(value => value.parentId !== 'undefined' && value.parentId != null)
  console.log(206, parents)

  let translator = (parents, childrens) => {
    parents.forEach((parent) => {
      childrens.forEach((current, index) => {
        if (current.parentId === parent.id) {
          let temp = JSON.parse(JSON.stringify(childrens))
          temp.splice(index, 1)
          typeof parent.childrens !== 'undefined' ? parent.childrens.push(current) : parent.childrens = [current]
          translator([current], temp)
        }
      })
    })
  }
 
  translator(parents, childrens)
  return parents
}

function listToTree(data) {
  let arr = JSON.parse(JSON.stringify(data))
  const listChildren = (obj, filter) => {
    [arr, obj.children] = arr.reduce((res, val) => {
      if (filter(val))
        res[1].push(val)
      else
        res[0].push(val)
      return res
    }, [[],[]])
    console.log(obj)
    obj.children.forEach(val => {
      if (arr.length)
      listChildren(val, obj => obj.parentId === val.id)
    })
  }

  const tree = {}
  listChildren(tree, val => arr.findIndex(i => i.id === val.parentId) === -1)
  return tree.children
}

/**
 * arr是剩余的数组
 * obj是从顶往下逐步递归
 * @param {*} data 
 */
function getTree(data) {
  let arr = [...data];
  const tree = (obj, filter) => {
    [arr, obj.children] = arr.reduce((res, value) => {
      if (filter(value)) {
        res[1].push(value);
      } else {
        res[0].push(value);
      }
      return res;
    }, [[], []]);
    console.log(arr)
    obj.children.forEach(val => {
      if (arr.length) {
        tree(val, obj => obj.parentId === val.id)
      }
    })
  }

  const trees = {};
  tree(trees, item => arr.findIndex(i => i.id === item.parentId) === -1);
  return trees.children
}



const treelist =   [{
        id: 1,
        name: '1',
        parentId:  null
    }, {
        id: 2,
        name: '1-1',
        parentId: 1
    }, {
        id: 3,
        name: '1-1-1',
        parentId: 2
    }, {
        id: 4,
        name: '1-2',
        parentId: 1
    }, {
        id: 5,
        name: '1-2-2',
        parentId: 4
    }, {
        id: 6,
        name: '1-1-1-1',
        parentId: 3
    }, {
        id: 7,
        name: '2',
    }]


console.log('fnSetTreeData', getTree(treelist))
