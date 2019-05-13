import React from 'react';
import styles from './index.css';

const PrivateLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>PrivateLayout: Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
};

export default PrivateLayout;
