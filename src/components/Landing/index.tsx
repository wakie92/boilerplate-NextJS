'use client';

import React from 'react';

import landing from 'src/locale/landing';

import Todo from './Todo';
import { LandingTitle, LandingWrapper } from './styled';

const Landing = () => {
  return (
    <LandingWrapper>
      <LandingTitle>{landing.landing.title}</LandingTitle>
      <Todo />
    </LandingWrapper>
  );
};

export default Landing;
