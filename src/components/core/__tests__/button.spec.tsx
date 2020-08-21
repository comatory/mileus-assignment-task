import * as React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import Button, { Props } from '../button'

chai.use(chaiEnzyme())

describe('Button', () => {
  const renderComponent = (props: Partial<Props> = {}) => {
    return shallow(<Button {...props} />)
  }

  it('should render button', () => {
    const wrapper = renderComponent()

    expect(wrapper.find('button.button')).to.exist
  })

  it('should render button with HTML type property', () => {
    const wrapper = renderComponent({ htmlType: 'submit' })

    expect(wrapper.find('button').props().type)
      .to.equal('submit')
  })

  it('should render primary button', () => {
    const wrapper = renderComponent({ type: 'primary' })

    expect(wrapper.find('.button--primary')).to.exist
  })

  it('should render secondary button', () => {
    const wrapper = renderComponent({ type: 'secondary' })

    expect(wrapper.find('.button--secondary')).to.exist
  })


  it('should render secondary button by default', () => {
    const wrapper = renderComponent()

    expect(wrapper.find('.button--secondary')).to.exist
  })

  it('should render button with class name', () => {
    const wrapper = renderComponent({ className: 'test-button' })

    expect(wrapper.find('.test-button')).to.exist
  })

  it('should render disabled button', () => {
    const wrapper = renderComponent({ disabled: true })

    expect(wrapper.find('button').props().disabled).to.be.true
  })

  it('should render enabled button', () => {
    const wrapper = renderComponent({ disabled: false })

    expect(wrapper.find('button').props().disabled).not.to.be.true
  })

  it('should render enabled button by default', () => {
    const wrapper = renderComponent()

    expect(wrapper.find('button').props().disabled).not.to.be.true
  })

  it('should pass onClick callback to button', () => {
    const onClick = jest.fn()
    const wrapper = renderComponent({ onClick })

    expect(wrapper.find('button').props().onClick)
      .to.equal(onClick)
  })
})
