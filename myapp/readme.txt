react-bootstrap: https://react-bootstrap.github.io/
bootstrap: http://www.bootcss.com/
create-react-app: https://github.com/facebook/create-react-app
react: https://reactjs.org/


frames:
react、react-bootstrap

modules:
create-react-app、lodash、react-fontawesome、sass

entrence: ./src/index.js
dev_commond: npm start
before development, we should first run npm install,
second edit the node_modules/react-scripts/config/webpack.config.dev.js 
add /.scss$/ at exclude
add {
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
},
at loaders

the same as node_modules/react-scripts/config/webpack.config.prod.js 
