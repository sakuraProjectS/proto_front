<template>
  <section class="home-about">
    <div class="section__title">
      <div class="section__title-text">未来へメッセージを送りましょう</div>
    </div>
    <v-container>
      <v-row>
        <v-col md="7">
          <img src="../assets/img/family1.png"  >
        </v-col>
        <v-col md="5" >
          <img src="../assets/img/post.jpg" width="400" height="300" >
        </v-col>
      </v-row>
      <!-- <AppButton :button-text="buttonText" :url="url"/> -->
    </v-container>
  </section>
</template>

// <script>
// import AppButton from './AppButton.vue'

// export default {
//     data() {
//         return {
//             buttonText: 'メッセージを書く',
//             url: '/send'
//         }
//     },
//     components: {
//         AppButton
//     }
// }
// </script>

<style lang="scss" scoped>
.section__title {
  padding-top: 120px;
  text-align: center;
 
  &-text {
    font-weight: 700;
    font-size: 40px;
    color: #e65f78;
  }
}
</style>