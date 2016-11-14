/* @flow */

module.exports = class Api {
  domain: string
  constructor (domain: string = 'localhost:8080') {
    this.domain = domain
  }
  create (id: string, options: any): void {
    // TODO
  }
  send (type: string): void {
    // TODO
  }
}
