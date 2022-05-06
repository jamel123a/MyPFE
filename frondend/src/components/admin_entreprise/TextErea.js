import classNames from 'classnames'
import React from 'react'

function TextErea({label,name,onChangeHandler,placeholder,errors ,rows}) {
  return (
    <div className='form-group'>
        <label htmlFor="Email" className='form-label'>
           {label}
        </label>
        <textarea 
        rows={rows}
        className={classNames("form-control", {"is-invalid" :errors})}
         name={name} 
        onChange={onChangeHandler}
        placeholder={placeholder}
        ></textarea>
        {
        errors && (<div class="invalid-feedback">
        {errors}
      </div>)
    }
    </div>
  )
}

export default TextErea