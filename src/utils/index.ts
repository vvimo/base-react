import { cloneDeep, isString, flow, curry } from 'lodash'
import umiRouter from 'umi/router'
import pathToRegexp from 'path-to-regexp'
import { layouts } from 'config';
import { i18n } from './config';

export const { defaultLanguage } = i18n
export const languages = i18n.languages.map(item => item.key)

export function queryLayout(pathname) {
  // 0. 获取 primary & private 页面
  const primarys = layouts.primary
  const privates = layouts.private
  // 1. result 设置默认值
  let result = 'public'
  // 2. pathname 是否存在 primary
  if (primarys && primarys.indexOf(deLangPrefix(pathname)) >= 0) {
    result = 'primary'
  }
  // 3. pathname 是否存在 private
  if (privates && privates.indexOf(deLangPrefix(pathname)) >= 0) {
    result = 'private'
  }
  return result
}

export const langFromPath = curry(
  /**
   * Query language from pathname.
   * @param   {array}     languages         Specify which languages are currently available.
   * @param   {string}    defaultLanguage   Specify the default language.
   * @param   {string}    pathname          Pathname to be queried.
   * @return  {string}    Return the queryed language.
   */
  (languages, defaultLanguage, pathname) => {
    for (const item of languages) {
      if (pathname.startsWith(`/${item}/`)) {
        return item
      }
    }
    return defaultLanguage
  }
)(languages)(defaultLanguage)

export const deLangPrefix = curry(
  /**
   * Remove the language prefix in pathname.
   * @param   {array}     languages  Specify which languages are currently available.
   * @param   {string}    pathname   Remove the language prefix in the pathname.
   * @return  {string}    Return the pathname after removing the language prefix.
   */
  (languages, pathname) => {
    if (!pathname) {
      return
    }
    for (const item of languages) {
      if (pathname.startsWith(`/${item}/`)) {
        return pathname.replace(`/${item}/`, '/')
      }
    }
    return pathname
  }
)(languages)

/**
 * Add the language prefix in pathname.
 * @param   {string}    pathname   Add the language prefix in the pathname.
 * @return  {string}    Return the pathname after adding the language prefix.
 */
export function addLangPrefix(pathname) {
  const prefix = langFromPath(window.location.pathname)
  return `/${prefix}${deLangPrefix(pathname)}`
}

const routerAddLangPrefix = params => {
  if (isString(params)) {
    params = addLangPrefix(params)
  } else {
    params.pathname = addLangPrefix(params.pathname)
  }
  return params
}

/**
 * Adjust the router to automatically add the current language prefix before the pathname in push and replace.
 */
const myRouter = { ...umiRouter }

myRouter.push = flow(
  routerAddLangPrefix,
  umiRouter.push
)

myRouter.replace = flow(
  routerAddLangPrefix,
  myRouter.replace
)

export const router = myRouter

/**
 * Whether the path matches the regexp if the language prefix is ignored, https://github.com/pillarjs/path-to-regexp.
 * @param   {string|regexp|array}     regexp     Specify a string, array of strings, or a regular expression.
 * @param   {string}                  pathname   Specify the pathname to match.
 * @return  {array|null}              Return the result of the match or null.
 */
export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(deLangPrefix(pathname))
}
