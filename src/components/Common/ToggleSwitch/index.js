import React from 'react'
import './style.css'

const ToggleSwitch = ({
  id,
  name,
  checked,
  onChange,
  small,
  disabled,
  optionLabels = ['Yes', 'No'],
}) => {
  const handleKeyPress = e => {
    if (e.keyCode !== 32) return
    e.preventDefault()
    onChange(!checked)
  }

  return (
    <div className={'toggle-switch' + (small ? ' small-switch' : '')}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(id, e.target.checked)}
        disabled={disabled}
      />
      {id ? (
        <label
          className="toggle-switch-label"
          tabIndex={disabled ? -1 : 1}
          onKeyDown={e => handleKeyPress(e)}
          htmlFor={id}
        >
          <span
            className={
              disabled
                ? 'toggle-switch-inner toggle-switch-disabled'
                : 'toggle-switch-inner'
            }
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
            tabIndex={-1}
          />
          <span
            className={
              disabled
                ? 'toggle-switch-switch toggle-switch-disabled'
                : 'toggle-switch-switch'
            }
            tabIndex={-1}
          />
        </label>
      ) : null}
    </div>
  )
}

export default ToggleSwitch
