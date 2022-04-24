import React from 'react'
import ClassName from 'classnames'
export default function Input({name,type,label,onChangeHanlder,errors}) {
  return (
  

    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
        {label}
    </label>
    <input
      type={type}
      class={ClassName("form-control", {"is-invalid" :errors})}
      id="exampleInputPassword1"
      name={name}
      onChange={onChangeHanlder}
    />
    {
        errors && (<div class="invalid-feedback">
        {errors}
      </div>)
    }
  </div>

  
  )
}
