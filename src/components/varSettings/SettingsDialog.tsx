import React, { useContext, Dispatch, SetStateAction } from 'react'

import { DataStoreContext } from '../../App'
import ChoiceSettings from './ChoiceSettings'

export interface settingsProps {
  varId?: number,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function SettingsDialog({ varId, open, setOpen }: settingsProps) {

  const {DATA_STORE} = useContext(DataStoreContext);
  const variable = DATA_STORE.getVariableById(varId);

  return (
    variable.type === 'choice'
    ? 
    <ChoiceSettings
      {...{ variable, open, setOpen }}
    />
    :
    // variable instanceof Random
    // ?
    // <RandomSettings
    // />
    // :
    null
  )
}
