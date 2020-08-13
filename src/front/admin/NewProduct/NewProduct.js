import React from 'react';
import PublishForm from '../../commonComponents/PublishForm';
import Fields from './components/Fields';

export const NewProduct = () => (
  <PublishForm Fields={Fields} link='product'/>
);
