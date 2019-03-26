import React from 'react';

import Wrapper from './NavigationItemsStyled';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({ isAuth }) => {
  let authLinks = null;
  if (isAuth) {
    authLinks = (
      <>
        <NavigationItem link="/">List of Rabbits</NavigationItem>
        <NavigationItem link="/addRabbit">Add Rabbit</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </>
    );
  } else {
    authLinks = <NavigationItem link="/auth">Authenticate</NavigationItem>;
  }
  return (
    <Wrapper>
      { authLinks }
    </Wrapper>
  );
};

export default navigationItems;
