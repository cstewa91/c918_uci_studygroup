import React from 'react'

export default ({ props, resetFilter, input, className, label, meta: size, type = 'text' }) => (
   <div>
      <input {...input} type={type} placeholder={label} size={size} className={className}/> <button className="search-filter-button" type="submit">FILTER</button> <button className="reset-search-button" onClick={resetFilter} type="button">RESET</button>
   </div>
)
