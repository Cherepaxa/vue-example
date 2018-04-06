const utils = {
  // Generate random string
  randomString (length = 10) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = 0; i < length; i += 1) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },

  bar () {
    console.log('bar')
  }
}

export default utils
