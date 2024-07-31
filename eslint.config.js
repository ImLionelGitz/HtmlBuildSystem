var eslint = require('@eslint/js')
var tslint = require('typescript-eslint')
var path = require('path')

module.exports = tslint.config(
    eslint.configs.recommended,
    ...tslint.configs.recommended,

    {
        ignores: ['*.js'],
    }
)