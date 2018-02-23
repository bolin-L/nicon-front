import Vue from 'vue'
import Router from 'vue-router'
import indexRouter from './index'
import userRouter from './user'
import docsRouter from './docs'
import searchRouter from './search'

Vue.use(Router)
// 合并所有的路由
function mergeRouter () {
    return indexRouter
        .concat(userRouter)
        .concat(docsRouter)
        .concat(searchRouter)
}

export default new Router({
    routes: mergeRouter()
})

