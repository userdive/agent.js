const path = require('path')

module.exports = {
  entry: {
    react: path.join(__dirname, 'src/app/react/index.tsx'),
    angular1: path.join(__dirname, 'src/app/angular1/main.ts'),
    angular: path.join(__dirname, 'src/app/angular/main.ts'),
    vue: path.join(__dirname, 'src/app/vue/index.ts')
  },
  output: {
    path: path.join(__dirname, 'dist/assets/'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      vue$: 'vue/dist/vue.common.js',
      'vue-router$': 'vue-router/dist/vue-router.common.js'
    }
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader' }]
  }
}
