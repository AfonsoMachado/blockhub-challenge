import Vue from 'vue';
import VueRouter from 'vue-router';

// pagina de cadastro de usuario
import Register from '@/components/Register';
// pagian de cadastro de projeto
import Project from '@/components/Project';
import AllProjects from '@/components/AllProjects';
// pagina de cadastro de horas trabalhadas por projeto
import Hours from '@/components/Hours';
// pagina de login
import Login from '@/components/Login';

Vue.use(VueRouter);

const routes = [
  {
    name: 'login',
    path: '/',
    component: Login,
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
  },
  {
    name: 'project',
    path: '/project',
    component: Project,
  },
  {
    name: 'projects',
    path: '/projects',
    component: AllProjects,
  },
  {
    name: 'hours',
    path: '/hours',
    component: Hours,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

export default router;
