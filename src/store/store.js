import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import formValidate from '../components/form/formValidate'
export default new vuex.Store({
    modules: {
        formValidate: formValidate
    }
})
