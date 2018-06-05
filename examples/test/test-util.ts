import { ClientFunction } from 'testcafe'

export const getLocation = ClientFunction(() => {
  return document.location.href
})
