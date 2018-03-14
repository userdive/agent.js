import * as React from 'react'

import Sample from './Sample'

export default class SampleWrapper extends React.PureComponent {
  render () {
    return <Sample linkTo='/sample2' linkValue='Sample2' />
  }
}
