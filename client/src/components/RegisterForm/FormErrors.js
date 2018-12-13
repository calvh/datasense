import React from 'react';

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(FormErrors).map((fieldName, i) => {
      if(FormErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {FormErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>