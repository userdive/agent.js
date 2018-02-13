export function createLink (href: string | undefined) {
  const link = document.createElement('a')
  if (href) {
    link.href = href
  }
  document.body.appendChild(link)
  return link
}

export function createForm (action: string, method: string) {
  const form = document.createElement('form')
  form.action = action
  form.method = method
  document.body.appendChild(form)
  return form
}
