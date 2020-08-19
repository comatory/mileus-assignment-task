import * as React from 'react'
import classNames from 'classnames'

interface Props {
  children?: Array<React.ReactChild> | React.ReactChild,
  className?: string,
}

const Panel = (props: Props) => {
  return (
    <div className={classNames('panel', props.className)}>
      {props.children}
    </div>
  )
}

export default Panel
