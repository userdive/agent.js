import * as React from 'react'
import { Link } from 'react-router-dom'

import EntryPointWrapper from './EntryPointWrapper'

export default class Sample1 extends React.PureComponent<{}> {
  public render () {
    return (
      <EntryPointWrapper>
        <Link to='/sample1'>Sample1</Link>
      </EntryPointWrapper>
    )
  }
}
