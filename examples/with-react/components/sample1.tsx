import * as React from 'react'
import { Link } from 'react-router-dom'

import EntryPointWrapper from './EntryPointWrapper'

export default class Sample2 extends React.PureComponent<{}> {
  public render() {
    return (
      <EntryPointWrapper>
        <Link to="/sample2">Sample2</Link>
      </EntryPointWrapper>
    )
  }
}
