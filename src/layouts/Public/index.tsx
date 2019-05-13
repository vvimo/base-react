import React from 'react';

import classnames from 'classnames';

import { MyLayout } from 'components';

import styles from './index.less';

const PublicLayout: React.FC = props => {
  return (
    <>
      <div className={styles.bar}>
        <MyLayout.Topbar>topbar</MyLayout.Topbar>
        <MyLayout.Sidebar>
          <div className="clearfix">asd</div>
        </MyLayout.Sidebar>
      </div>
      <div className={styles.content}>{props.children}</div>
    </>
  );
};

export default PublicLayout;
