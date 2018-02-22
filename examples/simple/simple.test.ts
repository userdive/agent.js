describe('example', function () {
  const root = 'http://localhost:8080'
  const email: string = 'userdive@example.com'
  const formQuery: string = '.form-group:first-of-type .form-controll'

  function displayRoot (client: any): any {
    return client.url(root).waitForElementVisible('body', 1000)
  }

  it('set input form elements', (client: any) => {
    displayRoot(client)
      .setValue(formQuery, email.split(''))
      .assert.value(formQuery, email)
      .end()
  })

  it('select a value', (client: any) => {
    displayRoot(client)
      .click('select[class="form-control"] option:nth-child(2)')
      .assert.value('select[class="form-control"]', 'example2')
      .end()
  })
})
