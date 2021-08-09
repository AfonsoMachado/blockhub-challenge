import Vue from 'vue';
import VueRouter from 'vue-router';

import Register from '@/components/Register';
import Project from '@/components/Project';
import Hours from '@/components/Hours';

Vue.use(VueRouter);

const routes = [
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
    name: 'hours',
    path: '/project/hours',
    component: Hours,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

export default router;
