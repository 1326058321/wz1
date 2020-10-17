const express=require("express")

const app=express()

app.set('secret','q156eqw11ewe5')

app.use(require('cors')())
app.use(express.json())

app.use('/', express.static(__dirname+'/web'))
app.use('/admin', express.static(__dirname+'/admin'))
 app.use('/uploads', express.static(__dirname+'/uploads')) //静态文件托管

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000,()=>{
    console.log('jt3000');
})|| '/admin/api'