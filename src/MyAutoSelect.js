import React, { useState, useEffect } from 'react';
import makeAnimated from 'react-select/animated';
import Creatable from 'react-select/creatable';

const ReduxFormSelect = props => {
  const { input, options } = props;
  const animatedComponents = makeAnimated();
  return (
    // <div>create</div>
    <Creatable
      isClearable  
      isMulti 
      {...input} 
      onChange={value => input.onChange(value)} 
      onBlur={() => input.onBlur(input.value)} 
      options={options}
      components={animatedComponents}
    />
  )

}
export default ReduxFormSelect;