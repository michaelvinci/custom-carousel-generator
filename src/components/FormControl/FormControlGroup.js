import React from 'react';

const FormControlGroup = (props) => {
  const styles = props.isDisabled ? 'input-group disabled' : 'input-group';
  const removed = props.isRemoved ? 'removed' : '';

  return (
    <div className={`${styles} ${removed}`}>
      {props.children}
    </div>
  );
}

export default FormControlGroup
