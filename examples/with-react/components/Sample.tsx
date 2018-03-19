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
  }
  componentDidMount () {
    this._ud('send', 'pageview', this.props.href)
  }
  render () {
    return this.props.children
  }
}

class Sample extends React.PureComponent<{
  linkTo: string
  location: any
  children: JSX.Element
  match: Object
}> {
  render () {
    const { linkTo, children, location: { href } } = this.props
    return (
      <EntryPointWrapper href={href}>
        <Link to={linkTo}>{children}</Link>
      </EntryPointWrapper>
    )
  }
}

export default withRouter(Sample)
