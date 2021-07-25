<template>
  <v-layout wrap>
    <v-flex v-for="message in messages" :key="message.to_data" xs12 md6 lg3>
      <v-card>

        <v-card-title> 
          {{message.name}} 
        </v-card-title> 
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>


export default {
 
  data() {
    return {
      cardsize: "",
      messages: [
        {name: '田中 敏之', title: '誕生日おめでとう', body: 'lkcnapkcnsakcnakncaspcnakpnakascacaca', from_date: '2021/03/21', to_date: '2021/05/23'},
        {name: '田中 権左衛門', title: '誕生日おめでとう', body: 'lkcnapkcnsakcnakncaspcnakpnakascacaca', from_date: '2021/03/21', to_date: '2021/05/23'},
      ]
    }
  },
  mounted() {
      console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': 
          this.cardsize = 220 
          break
        case 'sm': 
          this.cardsize = 400
          break
        case 'md': 
          this.cardsize = 500
          break
        case 'lg': 
          this.cardsize = 600
          break
        case 'xl': 
          this.cardsize = 800
          break
        
      }
    },
}
</script>