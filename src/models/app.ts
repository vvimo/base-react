import { router } from 'utils'
import { stringify } from 'qs'

export default {
  namespace: 'app',
  state: {},
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { locationPathname } = yield select(_ => _.app)
      // router.push({
      //   pathname: '/login',
      //   search: stringify({
      //     from: locationPathname,
      //   }),
      // })
    },
  },
  reducers: {},
}
