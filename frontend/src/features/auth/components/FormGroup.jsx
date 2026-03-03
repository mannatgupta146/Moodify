import React from "react"

const FormGroup = ({label, placeholder, value, onChange}) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input type={label} name={label} id={label} placeholder={placeholder} onChange={onchange} value={value} required />
    </div>
  )
}

export default FormGroup
