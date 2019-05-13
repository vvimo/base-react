import React from 'react';
import withRouter from 'umi/withRouter'
import { getLocale, IntlProvider } from 'umi-plugin-locale';

import { LocaleProvider } from 'antd';
import BaseLayout from './Base/index.tsx'

import { langFromPath, defaultLanguage, queryLayout } from 'utils';
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'

import 'themes/index.less'

const languages = {
  'zh-CN': zh_CN,
  'en-US': en_US,
}

@withRouter
class Layout extends React.Component {

  language = defaultLanguage

  componentDidMount() {
    const language = getLocale()
    this.language = language
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps)
  //   console.log(nextState)
  //   const language = getLocale()
  //   const preLanguage = this.language
  //   const { catalogs } = nextState
  //
  //   if (preLanguage !== language && !catalogs[language]) {
  //     this.language = language
  //     return false
  //   }
  //   this.language = language
  //   return true
  // }

  render() {
    const { children } = this.props
    let language = getLocale()
    return (
      <IntlProvider>
        <LocaleProvider locale={languages[language]}>
          <BaseLayout>{ children }</BaseLayout>
        </LocaleProvider>
      </IntlProvider>
    );
  }

};

export default Layout;
