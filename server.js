var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var compression = require('compression');

// We need to add a configuration to our proxy server,
// as we are now proxying outside localhost
var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
var app = express();
app.use(compression());

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 8181;


// If you only want this for development, you would of course
// put it in the "if" block below
// app.all('/db/*', function (req, res) {
//   proxy.web(req, res, {
//     target: 'https://glowing-carpet-4534.firebaseio.com'
//   });
// });
var publicPath = path.resolve(__dirname, 'dist/assets/');
console.log(publicPath);


if (!isProduction) {

 app.use('/assets', express.static(publicPath));
 
  app.all('/*', function (req, res) {
    console.log('Hello')
    proxy.web(req, res, {
        target: 'http://localhost:8180'
    });
  });

}
else {
  app.use('/dist/assets/', express.static(publicPath));

  app.use('/', express.static(path.resolve(__dirname, 'dist/')));

  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'dist/', 'index.html'))
  });
}


proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});