import Vue from 'vue';
import app from '../App.vue';

const vm = new Vue({
  el: '#app',
  data: {
    test: 1
  },
  render: (h) => h(app),
  components: {app}
});

Vue.filter('my-filter', function (value) {
  // 返回处理后的值
  return value + 1;
});

const myFilter = Vue.filter('my-filter')

console.log(myFilter(1));
console.log(vm._self, vm.$children, vm.$parent, vm.$root);
console.log(vm.$options);
console.log(vm.$data);
