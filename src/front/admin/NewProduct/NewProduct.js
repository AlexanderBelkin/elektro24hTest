import React from 'react';
import PublishForm from '../../components/PublishForm';
import Fields from './components/Fields';

const NewProduct = () => (
  <PublishForm Fields={Fields} link='product'/>
);

export default NewProduct;
