import vendor from './vendor'
import actions from './actions'
import stores from './stores'
import managers from './managers'

export default {
  ...vendor,
  ...actions,
  ...stores,
  ...managers,
}
