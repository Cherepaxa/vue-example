require('dotenv').config()

const fs = require('fs')
const express = require('express')
const LRU = require('lru-cache')
const path = require('path')
const resolve = (file) => path.resolve(__dirname, file)

const { createBundleRenderer } = require('vue-server-renderer')

const production = process.env.NODE_ENV === 'production'

const app = express()
const serve = (path, cache) => express.static(resolve(path))

let renderer
let readyPromise

if (production) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    clientManifest
  })
} else {
  readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
    renderer = createBundleRenderer(bundle, Object.assign(options, {
      cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      runInNewContext: false
    }))
  })
}

app.use('/dist', serve('./dist', true))

const microCache = LRU({
  max: 100,
  maxAge: 1000
})

function replaceParams (html, params) {
  for (let p in params) {
    html = html.replace("{"+p+"}", params[p])
  }
  return html
}

function render (req, res) {
  const hit = microCache.get(req.url)
  if (hit) {
    return res.end(hit)
  }

  const context = {
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.url) {
        res.redirect(err.url)
      } else if (err.code === 404) {
        res.status(404).send('404 | Page Not Found')
      } else {
        res.status(500).send('500 | Internal Server Error')
        console.error(`error during render : ${req.url}`)
        console.error(err.stack)
      }
      return
    }

    const {
      title, htmlAttrs, bodyAttrs, link, meta
    } = context.meta.inject()

    fs.readFile('src/index.template.html', 'utf8', function (err, template) {
      if (err) return console.log(err)

      html = replaceParams(template, {
        'meta.text': meta.text(),
        'title.text': title.text(),
        'link.text': link.text(),
        'context.renderStyles': context.renderStyles(),
        'html': html,
        'context.renderState': context.renderState(),
        'context.renderScripts': context.renderScripts(),
        'bodyAttrs.text': bodyAttrs.text(),
        'htmlAttrs.text': htmlAttrs.text()
      })

      microCache.set(req.url, html)
      return res.send(html)
    });

  })
}

app.get('*', production ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
