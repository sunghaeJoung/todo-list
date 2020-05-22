import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main";
import TodoInput from "../components/TodoInput";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main  
        },
        {
            path: '/input',
            name: 'todoInput',
            component: TodoInput  
        },
        {
            path: '/input/:id',
            name: 'todoInput',
            component: TodoInput  
        }
    ]
})
