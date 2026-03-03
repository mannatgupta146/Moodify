import React from "react"

const FormGroup = ({label, placeholder}) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input type={label} name={label} id={label} placeholder={placeholder} required />
    </div>
  )
}

export default FormGroup
