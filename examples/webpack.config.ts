const path = require('path')

module.exports = {
  entry: {
    'built-in': path.join(__dirname, 'built-in/index.ts'),
    react: path.join(__dirname, 'with-react/pages/index.tsx'),
    angular1: path.join(__dirname, 'with-angular1/main.ts'),
    angular: path.join(__dirname, 'with-angular/main.ts'),
    vue: path.join(__dirname, 'with-vue/index.ts')
  },
  output: {
    path: path.join(__dirname, 'build/assets/'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      vue$: 'vue/dist/vue.common.js',
      'vue-router$': 'vue-router/dist/vue-router.common.js'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    open: true
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader' }]
  }
}
