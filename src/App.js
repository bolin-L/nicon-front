// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './base/App'
import router from './router/router'
import cookie from 'vue-cookie'
import iview from 'iview';
import validator from './components/common/validator/index';

Vue.config.productionTip = false
Vue.use(cookie)
Vue.use(Vuex)
Vue.use(iview)
Vue.use(validator, {
    eventPatch: {
        prefix: 'on-'
    },
    triggerEvent: ['change'],
    successHandler (conclusion, value, options) {
        const parent = options.el.parentNode;

        if (parent.className.indexOf('ivu-form-item-error') !== -1) {
            const node = parent.getElementsByClassName('ivu-form-item-error-tip')[0];
            parent.removeChild(node);
            parent.className = parent.className.replace(' ivu-form-item-error', '');
        }
    },
    errorHandler (conclusion, value, options) {
        const parent = (options.el || options.compIns.$el).parentNode;
        let node;

        if (parent.className.indexOf('ivu-form-item-error') !== -1) {
            node = parent.getElementsByClassName('ivu-form-item-error-tip')[0];
            node.innerHTML = conclusion.message;
        } else {
            node = document.createElement('div');
            node.className = 'ivu-form-item-error-tip';
            node.innerHTML = conclusion.message;

            parent.appendChild(node);
            parent.className = parent.className + ' ivu-form-item-error';
        }
    }
})

const store = new Vuex.Store({
    state: {
        webUser: {},
        showLoginModal: false, // 显示登录框
        loginDialogType: 'login', // 默认显示登录页面
        isLogin: window.webUser && window.webUser.userId
    },
    mutations: {
        showLoginModal (state, payload) {
            state.showLoginModal = payload
        },
        loginDialogType (state, payload) {
            state.loginDialogType = payload
        },
        webUser (state, payload) {
            state.webUser = payload
            state.isLogin = payload.userId
            window.webUser = payload
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
