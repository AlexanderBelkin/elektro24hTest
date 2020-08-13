import React from 'react';
import {
  Paper,
} from '@material-ui/core';

import OurStory from './components/OurStory';
import Digits from './components/Digits';

export const About = () => {
  return (
    <Paper>
      <OurStory/>
      <Digits/>
    </Paper>
  )
};
