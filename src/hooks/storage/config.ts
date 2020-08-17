import { useState, useEffect, useContext, useCallback } from 'react'

import Context from '../../components/context'

export const useConfig = (key: string): string | null => {
  const { configStore } = useContext(Context)
  const [value, setValue ] = useState(configStore.getValueByKey(key))

  const handleConfigStoreChange = useCallback(() => {
    setValue(configStore.getValueByKey(key))
  }, [ key ])

  useEffect(() => {
    const subscriber = configStore.addListener(handleConfigStoreChange)

    return () => subscriber.remove()
  }, [ key ])

  return value
}
