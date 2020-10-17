module.exports = options => {
    const jwt = require('jsonwebtoken')
    var assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登入')
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登入')
        req.user = await AdminUser.findById(id)
        // console.log(req.user);
        assert(req.user, 401, '请先登入')
        await next()
    }
}