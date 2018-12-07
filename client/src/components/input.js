import React from 'react'

export default ({ input, label, meta: { error, touched }, size, type = 'text' }) => (
   <div>
      <input {...input} type={type} placeholder={label} size={size}/>
      <p>{touched && error}</p>
   </div>
)