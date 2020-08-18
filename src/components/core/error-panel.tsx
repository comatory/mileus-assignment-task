import * as React from 'react'

interface Props {
  error: Error,
}

const ErrorPanel = (props: Props) => {
  return (
    <div className='error-panel'>
      <div className='error-panel__content'>
        {props.error.message}
      </div>
      <div className='error-panel__meta'>
        ‼️
      </div>
    </div>
  )
}

export default ErrorPanel
