import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Helmet } from 'react-helmet'
import { Loader } from 'components'
import { queryLayout } from 'utils'
import NProgress from 'nprogress'
import config from 'config'
import withRouter from 'umi/withRouter'

import PublicLayout from '../Public/index.tsx'
import PrimaryLayout from '../Primary/index.tsx'
import PrivateLayout from '../Private/index.tsx'

const LayoutMap = {
  public: PublicLayout,
  primary: PrimaryLayout,
  private: PrivateLayout,
}

@withRouter
@connect(({ loading }) => ({ loading }))
class BaseLayout extends PureComponent {

  previousPath = ''

  render() {
    const { loading, children, location } = this.props
    const Container = LayoutMap[queryLayout(location.pathname)]

    const currentPath = location.pathname + location.search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    if (!loading.global) {
      NProgress.done()
      this.previousPath = currentPath
    }

    return (
      <Fragment>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Loader fullScreen spinning={loading.effects['app/query']} />
        <Container>{children}</Container>
      </Fragment>
    )
  }
}

BaseLayout.propTypes = {
  loading: PropTypes.object,
}

export default BaseLayout
