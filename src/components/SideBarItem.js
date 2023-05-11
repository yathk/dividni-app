import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import ChoiceVariableSettings from './ChoiceVariableSettings'

function SideBarItem({ id, name,

  setVarIdBeingRenamed,
  varIdBeingRenamed,
  handleVarRenamed,

  handleVarChanged,
  varIdBeingChanged,
  setVarIdBeingChanged
}) {

  let varNameField;
  if (varIdBeingRenamed !== id) {
    varNameField =
      <span
        id={id}
        className='var-name'
        onClick={() => setVarIdBeingRenamed(id)}>
        {name}
      </span>
  }
  else {
    varNameField =
      <input
        id={id}
        className='var-name-input'
        onKeyDown={(e) => handleVarRenamed(e)}
        onBlur={(e) => { handleVarRenamed(e); setVarIdBeingRenamed(null) }}
        autoFocus
        defaultValue={name}
      />
  }

  let isShowSettings = varIdBeingChanged === id

  return (
    <div className='sidebar-item'>
      {varNameField}
      <FontAwesomeIcon
        onClick={() => setVarIdBeingChanged(id)}
        className='var-config-icon'
        icon={solid('gear')}
      />
      {isShowSettings && <ChoiceVariableSettings />}
    </div>
  )
}

export default SideBarItem;