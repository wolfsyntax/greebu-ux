import Paymongo from 'paymongo-node'

export default (app, { secret, ...options }) => {
  app.config.globalProperties.$paymongo = new Paymongo(secret)
}
