'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 外層必須多引號
  APIPATH: '"http://vue-course-api.hexschool.io"',
  CUSTOMPATH: '"erickao"'
})
