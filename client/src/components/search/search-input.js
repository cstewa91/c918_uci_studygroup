import React from 'react'

export default ({ input, className, label, meta: size, type = 'text' }) => (
   <div>
      <input {...input} type={type} placeholder={label} size={size} className={className}/> <button className="search-filter-button" type="submit">Filter</button>
   </div>
)
