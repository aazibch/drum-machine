import React from 'react';

const column = (props) => {
  let elemClasses = ['column'];

  if (props.mobileOrderLast) {
    elemClasses.push('orderLast');
  }

  return <div className={elemClasses.join(' ')}>{props.children}</div>;
};

export default column;
