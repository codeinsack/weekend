import React from 'react';
import { NavLink } from 'react-router-dom';

import Wrapper from './NavigationItemStyled';

const navigationItem = ({ children, link, active }) => (
  <Wrapper active={active}>
    <NavLink exact to={link}>{children}</NavLink>
  </Wrapper>
);

export default navigationItem;
