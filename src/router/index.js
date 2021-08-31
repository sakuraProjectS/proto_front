import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import SelectFriend from '@/views/SelectFriend.vue'
import MessageContent from '@/views/MessageContent.vue'
import FriendProfile from '@/views/FriendProfile.vue'
import Profile from '@/views/Profile.vue'
import ProfileEdit from '@/views/ProfileEdit.vue'
import Test from '@/views/Test.vue'
import TimeLine from '@/views/TimeLine.vue'
import SendMessage from '@/views/SendMessage.vue'
import ShowRequest from '@/views/ShowRequest.vue'
import Sending from '@/views/Sending.vue'
import Store from '@/store/index.js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { isPublic: true}
  },
  {
    path: '/send',
    name: 'Send',
    component: SelectFriend,
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/profile_edit',
    name: 'ProfileEdit',
    component: ProfileEdit
  },
  {
    path: '/friend_profile',
    name: 'FriendProfile',
    component: FriendProfile,
    props: true
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/timeline',
    name: 'TimeLine',
    component: TimeLine
  },
  {
    path: '/sendmessage',
    name: 'SendMessage',
    component: SendMessage,
    props: true
  },
  {
    path: '/messagecontent',
    name: 'MessageContent',
    component: MessageContent
  },
  {
    path: '/showrequest',
    name: 'ShowRequest',
    component: ShowRequest
  },
  {
    path: '/sending',
    name: 'Sending',
    component: Sending
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.isPublic) && !!Store.state.userToken) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router
