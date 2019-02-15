module.exports = {
  plugins: {
    'postcss-write-svg': { 
      utf8: false 
    },
    'postcss-cssnext': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750, 
      viewportHeight: 1334, 
      unitPrecision: 4, 
      viewportUnit: 'vw', selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false
    }
  }
};
