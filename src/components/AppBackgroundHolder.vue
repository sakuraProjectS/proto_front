<template>
  <v-container fluid fill-height class="background-holder__content">
      <v-col class="background-holder__content-text">
        <p>{{head}}</p>
      </v-col>
  </v-container>
</template>

<script>
export default {
  props: {
    head: {
      type: String,
      required: true
    }
  }
}
</script>
<style  lang="scss" scoped>
.background-holder__content {
  background: url("../assets/back/sakura2.jpg");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 15vh;
 
  &-text {
    color: block;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
@import 'src/styles/common/_mixin.scss';
    @include display_pc {
      font-size: 40px;
    }
  }
}
</style>