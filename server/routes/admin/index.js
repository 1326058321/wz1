module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    var assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        mergeParams: true //合并url参数
    })
    //const Category=require('../../models/Category')
    //创建分类  创建资源
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //查询分类  资源列表
    router.get('/', async (req, res, next) => {
        
        const token=String(req.headers.authorization || '').split(' ').pop()
        assert(token,401,'请先登入')
        const {id}=jwt.verify(token,app.get('secret'))
        assert(id,401,'请先登入')
        req.user=await AdminUser.findById(id)
       // console.log(req.user);
        assert(req.user,401,'请先登入')
        await next()
    }, async (req, res) => {
        // populate('parent')
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    //获取 byid   资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //修改 byid   更新资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除 byid   删除资源
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    //登入校验中间件
    const authMiddleware=require('../../middleware/auth')
    const resourceMiddleware= require('../../middleware/resource')
    

    app.use('/admin/api/rest/:resource', authMiddleware(),resourceMiddleware(), router)



    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })   // sl/
    app.post('/admin/api/upload', authMiddleware(),upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://127.0.0.1:3000/uploads/${file.filename}`
        // file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        //1. 根据用户名找用户

        const user = await AdminUser.findOne({ username }).select('+password')
     
        assert(user,422,'用户不存在')
        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        //2.校验密码

        const isVaild = require('bcrypt').compareSync(password, user.password)
        assert(isVaild,422,'密码错误')
        // if (!isVaild) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }

        //3.放回token 


        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })

    })


    //错误处理函数
    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}