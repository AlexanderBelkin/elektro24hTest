import React from 'react';
import PublishForm from '../../components/PublishForm';
import Fields from './components/Fields';

const NewArticle = () => (
  <PublishForm Fields={Fields} link='article'/>
);

export default NewArticle;
