import classNames from 'classnames'
import React from 'react'

function InputGroup({label,type,name,onChangeHandler,placeholder,errors}) {
  return (
    <div className='form-group'>
        <label for="Email" className='form-label'>
           {label}
        </label>
        <input type={type}
        class={classNames("form-control", {"is-invalid" :errors})}
         name={name} 
        onChange={onChangeHandler}
        placeholder={placeholder}
        ></input>
        {
        errors && (<div class="invalid-feedback">
        {errors}
      </div>)
    }
    </div>
  )
}

export default InputGroup