import React from 'react';

import Wrapper from './ToolbarStyled';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = ({ isAuth }) => (
  <Wrapper>
    <NavigationItems isAuth={isAuth} />
  </Wrapper>
);

export default toolbar;
