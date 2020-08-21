import * as React from 'react'
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'
import chaiSinon from 'sinon-chai'

import RouteInput, { Props } from '../route-input'
import TestUtils from '../../../utils/test-utils'

chai.use(chaiEnzyme())
chai.use(chaiSinon)

describe('RouteInput', () => {
  const renderComponent = (props: Partial<Props> = {}) => {
    const defaultProps = {
      id: TestUtils.getRandomString(),
      value: TestUtils.getRandomString(),
      label: TestUtils.getRandomString(),
      onSubmit: sinon.spy(),
    }

    return shallow(<RouteInput {...defaultProps} {...props} />)
  }

  it('should render label', () => {
    const wrapper = renderComponent()

    expect(wrapper.find('label.route-input__label')).to.exist
  })

  it('should render label text', () => {
    const wrapper = renderComponent({
      label: 'Mileus',
    })

    expect(wrapper.find('label.route-input__label')).to.have.text('Mileus')
  })

  it('should render input', () => {
    const wrapper = renderComponent()

    expect(wrapper.find('input.route-input')).to.exist
  })

  it('should render input with ID', () => {
    const wrapper = renderComponent({
      id: 'abcd',
    })

    expect(wrapper.find('input.route-input').props().id)
      .to.equal('abcd')
  })

  it('should render text input', () => {
    const wrapper = renderComponent()

    expect(wrapper.find('input.route-input').props().type)
      .to.equal('text')
  })

  it('should render text value', () => {
    const wrapper = renderComponent({
      value: 'Test value'
    })

    expect(wrapper.find('input.route-input').props().value)
      .to.equal('Test value')
  })

  it('should render disabled input', () => {
    const wrapper = renderComponent({
      disabled: true,
    })

    expect(wrapper.find('input.route-input').props().disabled)
      .to.be.true
  })

  it('should render enabled input', () => {
    const wrapper = renderComponent({
      disabled: false,
    })

    expect(wrapper.find('input.route-input').props().disabled)
      .to.be.false
  })

  it('should render enabled input by default', () => {
    const wrapper = renderComponent()

    expect(wrapper.find('input.route-input').props().disabled)
      .to.be.false
  })

  it('should update input text', () => {
    const event = { currentTarget: { value: 'Test Input' }
    }
    const wrapper = renderComponent()

    wrapper.find('input.route-input').simulate('change', event)

    expect(wrapper.find('input.route-input').props().value)
      .to.equal('Test Input')
  })

  describe('submission', () => {
    it('should call onSubmit callback when input field ' +
       'contains valid value and user hits enter', () => {
      const onSubmit = sinon.spy()
      const wrapper = renderComponent({ onSubmit })

      wrapper.find('input.route-input').simulate('change', {
        currentTarget: { value: '12.321, 16.221' }
      })
      wrapper.find('input.route-input').simulate('keydown', {
        keyCode: 13,
      })

      expect(onSubmit).to.have.been.calledOnce
    })

    it('should call onSubmit callback with valid value', () => {
      const onSubmit = sinon.spy()
      const wrapper = renderComponent({ onSubmit })

      wrapper.find('input.route-input').simulate('change', {
        currentTarget: { value: '12.321, 16.221' }
      })
      wrapper.find('input.route-input').simulate('keydown', {
        keyCode: 13,
      })

      expect(onSubmit).to.have.been.calledWith('12.321, 16.221')
    })

    it('should NOT call onSubmit callback when input field ' +
       'contains invalid value and user hits enter', () => {
      const onSubmit = sinon.spy()
      const wrapper = renderComponent({ onSubmit })

      wrapper.find('input.route-input').simulate('change', {
        currentTarget: { value: 'abcd' }
      })
      wrapper.find('input.route-input').simulate('keydown', {
        keyCode: 13,
      })

      expect(onSubmit).not.to.have.been.called
    })

    it('should NOT call onSubmit callback when input field ' +
       'contains valid value and user DOES NOT hit enter', () => {
      const onSubmit = sinon.spy()
      const wrapper = renderComponent({ onSubmit })

      wrapper.find('input.route-input').simulate('change', {
        currentTarget: { value: '12.321, 16.221' }
      })
      wrapper.find('input.route-input').simulate('keydown', {
        keyCode: 11,
      })

      expect(onSubmit).not.to.have.been.called
    })
  })

  describe('blur', () => {
    it('should call onBlur callback when input is blurred', () => {
      const onBlur = sinon.spy()
      const wrapper = renderComponent({ onBlur })

      wrapper.find('input.route-input').simulate('blur', {
        currentTarget: { value: 'abcd' }
      })

      expect(onBlur).to.have.been.calledOnce
    })

    it('should call onBlur callback with current input value', () => {
      const onBlur = sinon.spy()
      const wrapper = renderComponent({ onBlur })

      wrapper.find('input.route-input').simulate('blur', {
        currentTarget: { value: 'abcd' }
      })

      expect(onBlur).to.have.been.calledWith('abcd')
    })

    it('should NOT call onBlur callback when not provided', () => {
      const onBlur = sinon.spy()
      const wrapper = renderComponent()

      wrapper.find('input.route-input').simulate('blur', {
        currentTarget: { value: 'abcd' }
      })

      expect(onBlur).not.to.have.been.called
    })
  })

  describe('validity', () => {
    it('should invalidate input on blur when value is not valid', () => {
      const wrapper = renderComponent()

      wrapper.find('input.route-input').simulate('blur', {
        currentTarget: { value: 'abcd' }
      })

      expect(wrapper.find('.route-input--invalid')).to.exist
    })

    it('should validate input on blur when value is valid', () => {
      const wrapper = renderComponent()

      wrapper.find('input.route-input').simulate('blur', {
        currentTarget: { value: '12.21, 31.12' }
      })

      expect(wrapper.find('.route-input--invalid')).not.to.exist
    })

    it('should invalidate when updated value is not valid', () => {
      const wrapper = renderComponent()

      wrapper.setProps({ value: 'abcd' })

      expect(wrapper.find('.route-input--invalid')).to.exist
    })

    it('should set validity to true on received valid prop', () => {
      const wrapper = renderComponent({ value: '12.21, 13.33' })

      wrapper.setProps({ valid: true })

      expect(wrapper.find('.route-input--invalid')).not.to.exist
    })

    it('should set validity to false on received invalid prop', () => {
      const wrapper = renderComponent({ value: 'acd' })

      wrapper.setProps({ valid: false })

      expect(wrapper.find('.route-input--invalid')).to.exist
    })

    it('should set validity to true on initial render based on valid value', () => {
      const wrapper = renderComponent({ value: '12.21, 13.33' })

      expect(wrapper.find('.route-input--invalid')).not.to.exist
    })

    it('should set validity to false on initial render based on invalid value', () => {
      const wrapper = renderComponent({ value: 'abcd' })

      expect(wrapper.find('.route-input--invalid')).to.exist
    })
  })
})

