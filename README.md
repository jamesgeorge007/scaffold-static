<p align="center">
	<img src="/art/logo.png" width="400" height="92" alt="scaffold-static logo">
</p>

<br>
<br>

<p align="center">
	<a href="https://travis-ci.com/jamesgeorge007/scaffold-static"><img src="https://travis-ci.com/jamesgeorge007/scaffold-static.svg?branch=master" alt="Build Status"/></a>
	<a href="https://www.npmjs.com/package/scaffold-static"><img src="https://badgen.net/npm/v/scaffold-static" alt="npm version"/></a>
	<a href="https://www.npmjs.com/package/scaffold-static"><img src="https://badgen.net/npm/dm/scaffold-static" alt="Downloads"/></a>
	<a href="http://github.com/jamesgeorge007/scaffold-static/pulls"><img src="https://img.shields.io/badge/PRs%20-welcome-brightgreen.svg" alt="PRs Welcome"/></a>
</p>

<p align="center">
	<a href='https://www.buymeacoffee.com/jamesgeorge007' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png' border='0' alt='Buy Me a Coffee' /></a>
</p>

`scaffold-static` lets you automate the local development environment setup and build static sites (vanilla-JS) with ease.


## Installation
`npm install -g scaffold-static`


## Usage
If you have installed `scaffold-static`  globally, 

```sh
scaffold-static new <project_name>
```

or, you could use it with `npx`
```sh
npx scaffold-static new <project_name>
```

- Supply `--use-npm` to use `npm` as the package manager.


## How it works

* Choose your favourite CSS framework to work with.

> Currently the following CSS frameworks are supported:-

* [Bootstrap-3](https://getbootstrap.com/docs/3.3/)
* [Bootstrap-4](https://getbootstrap.com/)
* [Materialize css](https://materializecss.com/)
* [Foudation css](https://foundation.zurb.com/)
* [Semantic-UI](https://semantic-ui.com/)
* [Bulma css](https://bulma.io/)

* `scaffold-static` generates the bare minimum boilerplate template with necessary `webpack` configurations to build the project for production.

  A `webpack.config.js` file is made available which depends on the following packages:-
  - [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin): Simplifies creation of HTML files to serve your webpack bundles.
  - [css-loader](https://github.com/webpack-contrib/css-loader) -  interprets `@import` and `url()` like `import/require()` and will resolve them.
  - [style-loader](https://github.com/webpack-contrib/style-loader) - Injects CSS into the DOM.

* Leverage the advantages put forward by `webpack-dev-server` such as [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) essentially adding it to the DX.


## Contributing
  Please see the [contributing guidelines](.github/CONTRIBUTING.md)

## License
> GNU GPL V3


## Credits
- Created by [James George](https://twitter.com/james_madhacks)
- Logo by [Caneco](https://twitter.com/caneco)
