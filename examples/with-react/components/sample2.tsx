import * as React from 'react'

import Sample from './Sample'

export default class SampleWrapper extends React.PureComponent {
  render () {
    return <Sample linkTo='/sample1'>Sample1</Sample>
  }
}
