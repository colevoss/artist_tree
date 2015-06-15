var koa = require('koa');
var koaStatic = require('koa-static');
var app = koa();


app.use(koaStatic(__dirname + '/dist'));

app.listen(3000);
console.log('Koa is listening on port 3000!')
