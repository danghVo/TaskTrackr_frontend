import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index.html',
      name: "LogInRequired",
      props: true,
      component: () => import("@/components/requireLogIn.vue")
    },
    {
      path: '/login',
      name: 'LogIn',
      props: true,  
      component: () => import("@/views/LogInView.vue")
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import("@/views/SignInView.vue"),
    },
    {
      path: "/todolist/:userCollection",
      name: "ToDoList",
      component: () => import("@/views/UserView.vue"),
      alias: ["/todoList"],
      children: [
        {
          path: "date",
          name: "DateShow",
          props: true,
          component: () => import("@/components/UserDate.vue")
        },
        {
          path: "date/:dateId",
          name: "ToDo",
          props: true,
          component: () => import("@/components/UserToDo.vue"),
          children: [
            {
              path: "todo",
              name: "ToDoShow",
              props: true,
              component: () => import("@/components/todo.vue")
            },
            {
              path: "todo/:todoId",
              name: "ActionShow",
              props: true,
              component: () => import("@/components/action.vue")
            }
          ]
        },
      ],
      props: true
    },
    { path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import("@/views/404NotFoundView.vue") 
    },
  ]
})

console.log(import.meta.env.BASE_URL)

export default router
