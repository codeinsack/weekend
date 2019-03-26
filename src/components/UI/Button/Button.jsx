import React from 'react';

import Wrapper from './ButtonStyled';

const button = ({
  children, btnType, clicked, disabled,
}) => (
  <Wrapper btnType={btnType} onClick={clicked} disabled={disabled}>
    {children}
  </Wrapper>
);

export default button;
