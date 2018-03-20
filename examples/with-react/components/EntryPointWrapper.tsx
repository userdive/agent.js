import * as H from 'history'
import * as React from 'react'
import { withRouter } from 'react-router'
import factory from 'userdive'

type Props = {
  children: any
  location: H.Location
  history: H.History
  match: any
}

class EntryPointWrapper extends React.PureComponent<Props> {
  _ud: Function
  constructor (props: Props) {
    super(props)
    this._ud = factory()
  }
  componentDidMount () {
    this._ud('send', 'pageview', this.props.location.pathname)
  }
  render () {
    return this.props.children
  }
}

export default withRouter(EntryPointWrapper)
