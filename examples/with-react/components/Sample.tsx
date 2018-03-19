import * as React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import factory from 'userdive'

type Props = {
  href: string
  children: JSX.Element
}

class EntryPointWrapper extends React.PureComponent<Props> {
  _ud: Function
  constructor (props: Props) {
    super(props)
    this._ud = factory()
    this._ud('create', 'af57h6gb', 'auto')
  }
  componentDidMount () {
    this._ud('send', 'pageview', this.props.href)
  }
  render () {
    return this.props.children
  }
}

type SampleProps = {
  linkTo: string
  location: { href: string }
  children: Function
}

function Sample ({ linkTo, children, location: { href } }: SampleProps) {
  return (
    <EntryPointWrapper href={href}>
      <Link to={linkTo}>{children}</Link>
    </EntryPointWrapper>
  )
}

export default withRouter(Sample)
