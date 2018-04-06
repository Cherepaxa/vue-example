import { createApp } from './main'

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)
    context.meta = app.$meta()

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ code: 404 })
      }
      Promise.all(matchedComponents.map((component, index, array) => {
        if (component.preFetch) {
          return component.preFetch(store)
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
