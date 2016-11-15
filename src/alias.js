/* @flow */

const timestamp = (): number => {
  return Date.now()
}

const uniqueId = (): string => {
  return '123'  // TODO
}

module.exports = {
  timestamp,
  uniqueId
}
