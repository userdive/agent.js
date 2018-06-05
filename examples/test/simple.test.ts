import { Selector } from 'testcafe'
import { baseUrl } from '../testcafe-conf'

fixture('simple page').page(baseUrl)

test('select a value', async (t) => {
  const select = Selector('select[class="form-control"]')

  const selectOption = select.find('option')
  await t
    .click(select)
    .click(selectOption.withText('example2'))
    .expect(select.value).eql('example2')
})

test('set input form elements', async (t) => {
  const email: string = 'userdive@example.com'
  const el = Selector('.form-group:first-of-type .form-controll')
  await t
  .typeText(el, email)
  .expect(el.value).eql(email)
})
