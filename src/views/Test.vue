<template>
  <v-card :size="cardsize">
    hogehoge
  </v-card>
</template>

<script>


export default {
 
  data() {
    return {
      cardsize: ""
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
 
  // methods: {
  //   // ...mapActions('users', ['updateUser']),
  //   // 選択された画像をdataに保存する
  //   async handleChange(event) {
  //     const { valid } = await this.$refs.provider.validate(event)
  //     if (valid) this.uploadAvatar = event.target.files[0]
  //   },
  //   // textなどの単純なデータと違い画像などのバイナリーファイルは
  //   // FormDataを使わなければサーバーに送ることができない。
  //   update() {
  //     const formData = new FormData()
  //     formData.append("user[name]", this.user.name)
  //     if (this.uploadAvatar) formData.append("user[avatar]", this.uploadAvatar)

  //     try {
  //       this.updateUser(formData)
  //       // this.$router.push({ name: "TaskIndex" })
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // }
}
</script>