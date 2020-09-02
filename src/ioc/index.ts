import { Ioc } from '@adonisjs/fold'

import vendorFactory from './vendor'
import actionsFactory from './actions'
import storesFactory from './stores'
import managersFactory from './managers'
import apisFactory from './apis'
import retrieversFactory from './retrievers'
import animationFactory from './animation'

import { Services } from '../interfaces/services'

const ioc: Ioc<Services> = new Ioc()

export default {
  ...animationFactory(ioc),
  ...vendorFactory(ioc),
  ...apisFactory(ioc),
  ...retrieversFactory(ioc),
  ...actionsFactory(ioc),
  ...storesFactory(ioc),
  ...managersFactory(ioc),
}
