import * as React from 'react'
import classNames from 'classnames'

interface Props {
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void,
  type: 'primary' | 'secondary',
  htmlType?: 'submit' | 'reset' | 'button',
  size: 'normal' | 'small'
  label: string,
  className?: string,
  disabled?: boolean,
}

const Button = (props: Props) => {
  const className = classNames('button', {
    'button--primary': props.type === 'primary',
    'button--secondary': props.type === 'secondary',
    [`${props.className}`]: Boolean(props.className),
  })
  return (
    <button
      type={props.htmlType}
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  )
}

Button.defaultProps = {
  type: 'secondary',
  size: 'normal',
  label: '',
  htmlType: 'button',
  boolean: false,
}

export default Button
