import React from 'react';
import Radium from 'radium';

import {
  inputElementStyle, inputStyle, labelStyle,
} from './InputStyled';

const input = (props) => {
  const {
    label, value, changed, invalid, shouldValidate, touched,
  } = props;

  if (invalid && shouldValidate && touched) {
    inputElementStyle.border = '1px solid red';
    inputElementStyle.backgroundColor = '#fda49a';
  } else {
    inputElementStyle.border = '1px solid #ccc';
    inputElementStyle.backgroundColor = 'white';
  }

  return (
    <div className={inputStyle}>
      <label className={labelStyle}>{label}</label>
      <input
        style={inputElementStyle}
        {...props.elementConfig}
        value={value}
        onChange={changed}
      />
    </div>
  );
};

export default Radium(input);
