import React from 'react';

import styles from './index.less';

class Topbar extends React.PureComponent {

  render () {
    const { children } = this.props;
    
    return (
      <div className={styles.topbar}>{children}</div>
    )
  }

}

export default Topbar;
