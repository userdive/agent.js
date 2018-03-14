import * as React from 'react'
import { render } from 'react-dom'
import App from './Routes'

const Application: any = App // FIXME hard cast
render(<Application />, document.getElementById('app'))
