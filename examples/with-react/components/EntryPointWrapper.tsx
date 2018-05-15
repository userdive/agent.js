import * as H from 'history'
import * as React from 'react'
import { StaticContext, withRouter } from 'react-router'
import factory from 'userdive'
// tslint:disable-next-line:no-submodule-imports
import { USERDIVEApi } from 'userdive/lib/types'

type Props = {
  children: any
  location: H.Location
  history: H.History
  match: any
  staticContext: StaticContext | undefined
}

class EntryPointWrapper extends React.PureComponent<Props> {
  public _ud: USERDIVEApi
  constructor (props: Props) {
    super(props)
    this._ud = factory()
  }
  public componentDidMount () {
    this._ud('send', 'pageview', this.props.location.pathname)
  }
  public render () {
    return this.props.children
  }
}

export default withRouter(EntryPointWrapper)
