<template>
  <v-app>
    <AppHeader v-if="$route.name !== 'Login'"></AppHeader>
    <v-main v-bind:class="{ bg: isActive }">
      <router-view/>
    </v-main>
    <!-- <AppFooter v-if="$route.name !== 'Login'"></AppFooter> -->
  </v-app>
</template>

<script>
import AppHeader from './components/header.vue'
// import AppFooter from './components/AppFooter.vue'
export default {
  data: () => ({
        isActive: false
    }),
  name: 'App',
  
  components: {
    AppHeader,
    // AppFooter
  },
  mounted: function() {
      if (this.$route.name != 'Login') {
          this.isActive = true
      }
    }
}

</script>

<style>
#app {
   font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0b0c0c;
  margin-top: 0px;
}
  .bg {
    background-image: url("~@/assets/back/stripe3.png");
    max-width:100%;
  }
</style>