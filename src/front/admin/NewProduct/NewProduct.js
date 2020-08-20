import React from 'react';
import PublishForm from '../../commonComponents/PublishForm';
import Fields from './components/Fields';

export const NewProduct = ({onClose}) => (
  <PublishForm Fields={Fields} link='product' onClose={onClose}/>
);
