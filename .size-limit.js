const dir = 'cdn'
module.exports = [
  {
    path: `${dir}/agent.js`,
    limit: '9.1 KB'
  },
  {
    path: `${dir}/agent.d.js`,
    limit: '21.9 KB'
  },
  {
    path: `${dir}/linker.js`,
    limit: '1.2 KB'
  },
  {
    path: `${dir}/kaizenplatform-plugin.js`,
    limit: '700 B'
  },
  {
    path: `${dir}/vwo-plugin.js`,
    limit: '870 B'
  },
  {
    path: `${dir}/optimizely-x-plugin.js`,
    limit: '830 B'
  }
]
