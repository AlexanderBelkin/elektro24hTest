import React from 'react';
import { Button } from "@material-ui/core";

const FetchingButton = ({fetching, fallback, children, ...attributes}) => (
  <Button disabled={fetching} {...attributes}>
    {fetching ? fallback : children}
  </Button>
)

export default FetchingButton;
