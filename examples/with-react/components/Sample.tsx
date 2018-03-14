import * as React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import userdive from 'userdive'

type Props = {
  linkTo: string
  linkValue: string
  match: any
  location: any
  history: any
}
const _ud = userdive()

function Sample ({ linkTo, linkValue, location: { href } }: Props) {
  _ud('send', 'pageview', href)
  return (
    <ul>
      <li>
        <Link to={linkTo}>{linkValue}</Link>
      </li>
    </ul>
  )
}

export default withRouter(Sample)
