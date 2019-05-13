module.exports = {
  siteName: 'AntD Admin',
  copyright: 'Ant Design Admin  © 2018 zuiidea',
  logoPath: '/logo.svg',
  apiPrefix: '/api',
  layouts: {
    primary: ['/login'],
    private: null,
  },
  i18n: {
    languages: [
      {
        key: 'en-US',
        title: 'English'
      },
      {
        key: 'zh-CN',
        title: '中文'
      }
    ],
    defaultLanguage: 'zh-CN' // 可以从缓存里面拿先
  },
};
