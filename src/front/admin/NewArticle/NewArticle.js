import React from 'react';
import PublishForm from '../../commonComponents/PublishForm';
import Fields from './components/Fields';

export const NewArticle = () => (
  <PublishForm Fields={Fields} link='article'/>
);
