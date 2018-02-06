import * as React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import userdive from 'userdive'

type Props = {
  linkTo: string;
  match: any;
  location: any;
  history: any;
}
const _ud = userdive()

function Sample ({ linkTo, location: { href } }: Props) {
  _ud('send', 'pageview', href)
  return (
    <div>
      <ul>
        <li>
          <Link to={linkTo}>{linkTo}</Link>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Sample)
