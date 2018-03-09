describe('with-react', function () {
  const linkQuery: string = '#content ul li a'
  const root = 'http://localhost:8080/with-react/#'

  function displayTop (client: any): any {
    return client.url(root).waitForElementVisible(linkQuery, 1000)
  }

  it('should display Top', (client: any) => {
    displayTop(client)
      .assert.containsText(linkQuery, 'sample2')
      .end()
  })

  it('should change to Sample2', (client: any) => {
    displayTop(client)
      .click(linkQuery)
      .pause(500)
      .assert.containsText(linkQuery, 'sample1')
      .assert.urlEquals(`${root}/sample2`)
      .end()
  })
})
