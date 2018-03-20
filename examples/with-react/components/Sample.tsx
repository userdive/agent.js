import * as H from 'history'
import * as React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import factory from 'userdive'

type Props = {
  pathname: string
  children: JSX.Element
}

class EntryPointWrapper extends React.PureComponent<Props> {
  _ud: Function
  constructor (props: Props) {
    super(props)
    this._ud = factory()
  }
  componentDidMount () {
    this._ud('send', 'pageview', this.props.pathname)
  }
  render () {
    return this.props.children
  }
}

const Sample = ({
  linkTo,
  children,
  location: { pathname }
}: {
  linkTo: string
  children: JSX.Element
  location: H.Location
  history: H.History
  match: any
}) => (
  <EntryPointWrapper pathname={pathname}>
    <Link to={linkTo}>{children}</Link>
  </EntryPointWrapper>
)

export default withRouter(Sample)
