import React, {useContext} from 'react'

import { DataStoreContext } from '../../App'
import ChoiceSettings from './ChoiceSettings'
import { Choice } from '../../model/Variable';

export default function SettingsDialog({ varId, open, setOpen }) {

  const DATA_STORE = useContext(DataStoreContext);
  const variable = DATA_STORE.getVariableById(varId);

  return (
    variable instanceof Choice && <ChoiceSettings open={open} setOpen={setOpen} />
  )
}
