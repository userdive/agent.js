describe('angular-ui router', function () {
  const linkQuery: string = 'div[ui-view] ul li a'
  const root = 'http://localhost:8080/fw/angular-ui/ui-router/#!'

  function displayTop (client: any): any {
    return client.url(root).waitForElementVisible(linkQuery, 1000)
  }

  it('should display Top', (client: any) => {
    displayTop(client)
      .assert.containsText(linkQuery, 'Sample2')
      .end()
  })

  it('should change to Sample2', (client: any) => {
    displayTop(client)
      .click(linkQuery)
      .pause(500)
      .assert.containsText(linkQuery, 'Sample1')
      .assert.urlEquals(`${root}/sample2`)
      .end()
  })
})
