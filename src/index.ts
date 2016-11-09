import api from './api'
export default api

declare var USERDIVEObject: string

function execute () {
  const r = []
  r.push.apply(r, arguments)
  const f = r.shift()
  api[f].apply(this, r)
}

if (USERDIVEObject && window[USERDIVEObject]) {
  const queue = window[USERDIVEObject].q
  for (const args in queue) {
    execute.apply(this, args)
  }
  window[USERDIVEObject] = execute
}
