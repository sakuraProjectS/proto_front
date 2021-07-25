<template>
  <v-app>
    <!-- <AppHeader v-if="$route.name !== 'Login'"></AppHeader> -->
    <v-main class='v-application'>
      <router-view/>
    </v-main>
    <!-- <AppFooter v-if="$route.name !== 'Login'"></AppFooter> -->
  </v-app>
</template>

<script>
// import AppHeader from './components/header.vue'
// import AppFooter from './components/AppFooter.vue'
export default {
  data: () => ({
        isActive: false
    }),
  name: 'App',
  
  components: {
    // AppHeader,
    // AppFooter
  },
  mounted: function() {
      if (this.$route.name != 'Login') {
          this.isActive = true
      }
    }
}

</script>

<style scoped>
.v-application {
  background-color: #fff4f6;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>