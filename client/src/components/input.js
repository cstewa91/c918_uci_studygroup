import React from 'react'

export default ({ input, label, meta: { error, touched }, size, type = 'text' }) => (
   <div>
      <input {...input} type={type} />
      <label>{label}</label>
      <p>{touched && error}</p>
   </div>
)