<template>
  <v-card>
    <v-container>
      <v-row justify="center" class='mt-10'>
        <v-col cols="2">
          <v-avatar> 
            <img
            :src="railsURL + avatar_url"
            style="object-fit: cover;"
            >
          </v-avatar> 
        </v-col>
        <v-col cols="10">
          <v-row>
            件名 : {{message.title}}
          </v-row>
          <v-row>
            {{message.time}} ← {{message.created_time}}
          </v-row>
        </v-col>
      </v-row>
      <v-container class='mt-10'>
        <v-row>
          {{message.body}}  
        </v-row>
        <v-row class='mt-10'>
          <v-img
              v-bind:src="railsURL + message.image_url"
              height=500
              max-width=500
          >
          </v-img>
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
import axios from '@/api/index'
var japaneseTime = ''
var japaneseTime2 = ''

export default {
    // props: {
    //     message_id: String
    // },
    data: () => ({
      message_id: '',
      message: {},
      uploadedImage: '',
      railsURL: "http://localhost:3000",
      avatar_url: '',
    }),
    created(){
        this.message_id = this.$route.params.message_id,
        this.avatar_url = this.$route.params.avatar_url
    },
    mounted() { 
      axios()
        .get('/users/' + localStorage.getItem('id') + '/messages/' + this.message_id,
        {
          headers: {
            'access-token': localStorage.getItem('access-token'),
              uid: localStorage.getItem('uid'),
              client: localStorage.getItem('client'),
          },
        },
        )
        .then(response => (
              this.message = response.data,
              japaneseTime = new Date(this.message.time * 1000),
              this.message.time = japaneseTime.getFullYear()
                  + '/' + ('0' + (japaneseTime.getMonth() + 1)).slice(-2)
                  + '/' + ('0' + japaneseTime.getDate()).slice(-2)
                  + ' ' + ('0' + japaneseTime.getHours()).slice(-2)
                  + ':' + ('0' + japaneseTime.getMinutes()).slice(-2),
              japaneseTime2 = new Date(this.message.created_time * 1000),
              this.message.created_time = japaneseTime2.getFullYear()
                  + '/' + ('0' + (japaneseTime2.getMonth() + 1)).slice(-2)
                  + '/' + ('0' + japaneseTime2.getDate()).slice(-2)
                  + ' ' + ('0' + japaneseTime2.getHours()).slice(-2)
                  + ':' + ('0' + japaneseTime2.getMinutes()).slice(-2)
    ))
  }
}
</script>