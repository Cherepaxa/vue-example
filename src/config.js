const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    appname: 'app:dev',
    api: {
      requests: {
        get: 'http://getmodel.com',
        post: 'http://getmodel.com'
      }
    }
  },
  production: {
    appname: 'app:prod'
  }
}

config[env].isDev = env === 'development'
config[env].isProd = env === 'production'

module.exports = config[env]
