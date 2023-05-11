import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import ChoiceVariableSettings from './ChoiceVariableSettings'

function SideBarItem({ id, name,
  // setVarIdBeingRenamed,
  varIdBeingRenamed,
  handleVarRenamed,

  handleVarChanged,
  varIdBeingChanged,
  setVarIdBeingChanged
}) {

  let varNameField;
    varNameField =
      <span
        id={id}
        className='var-name'
      >
        {name}
      </span>


  let isShowSettings = varIdBeingChanged === id

  return (
    <div 
      className='sidebar-item'
      onClick={() => alert("clicked")}
    >
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