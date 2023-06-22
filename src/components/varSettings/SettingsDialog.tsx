import React, { useContext, Dispatch, SetStateAction } from 'react'

import { DataStoreContext } from '../../App'
import ChoiceSettings from './ChoiceSettings'
import { Choice } from '../../model/Variable.js'

export interface settingsProps {
  varId?: number,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function SettingsDialog({ varId, open, setOpen }: settingsProps) {

  const {DATA_STORE} = useContext(DataStoreContext);
  const variable = DATA_STORE.getVariableById(varId);

  return (
    variable instanceof Choice
    ? <ChoiceSettings
      {...{ variable, open, setOpen }}
    />
    :
    null
  )
}
