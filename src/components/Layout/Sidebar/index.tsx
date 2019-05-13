import React from 'react';

import styles from './index.less';

class Sidebar extends React.PureComponent {

  render () {
    const { children } = this.props;

    return (
      <div className={styles.sidebar}>{children}</div>
    )
  }

}

export default Sidebar;
