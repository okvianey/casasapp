import React from 'react';

export const wrapRootElement = ({ element }) => {
  return <React.StrictMode>{element}</React.StrictMode>;
};