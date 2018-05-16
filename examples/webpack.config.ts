// tslint:disable-next-line:no-var-requires
const path = require('path')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    openPage: '/simple/',
    publicPath: '/agent.js/'
  },
  devtool: 'cheap-source-map',
  entry: {
    angular: path.join(__dirname, 'with-angular/main.ts'),
    angular1: path.join(__dirname, 'with-angular1/main.ts'),
    'built-in': path.join(__dirname, 'built-in/index.ts'),
    myPlugin: path.join(__dirname, 'plugin-create/plugin.ts'),
    react: path.join(__dirname, 'with-react/pages/index.tsx'),
    vue: path.join(__dirname, 'with-vue/index.ts')
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader' }]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build/agent.js')
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
      'vue-router$': 'vue-router/dist/vue-router.common.js'
    },
    extensions: ['.ts', '.tsx', '.js']
  }
}
