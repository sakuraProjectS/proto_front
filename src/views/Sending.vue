<template>
    <v-container>
        <v-list-item
            v-for="(message, index) in messages"
            :key="message.time"
        >
            <v-card
                height="100"
                width="800"
            >
                <v-row>
                    <v-col cols='3'>
                        <v-avatar> 
                            <img
                            :src="railsURL + avatar_urls[index]"
                            >
                        </v-avatar> 
                    </v-col>
                    <v-col cols='9'>
                    {{user_names[index]}}さんからメッセージが届きます
                    </v-col>
                </v-row>
            </v-card>
        </v-list-item>
    </v-container>
</template>

<script>
import axios from '@/api/index'

var japaneseTime = ''
var japaneseTime2 = ''

export default {
    data: () => ({
      messages: [],
      dialog: false,
      railsURL: "http://localhost:3000",
      user_names: [],
      users: [],
      avatar_urls: [],
    }),
    methods: {
       
    },
    async mounted() {
      await axios()
        .get('/sending/' ,{
          headers: {
            'access-token': localStorage.getItem('access-token'),
              uid: localStorage.getItem('uid'),
              client: localStorage.getItem('client'),
          },
        },
        )
        .then(response => (
          console.log(response),
          this.messages = response.data.messages,
          this.messages.forEach(message =>
            (
            japaneseTime = new Date(message.time * 1000),
            message.time = japaneseTime.getFullYear()
            + '/' + ('0' + (japaneseTime.getMonth() + 1)).slice(-2)
            + '/' + ('0' + japaneseTime.getDate()).slice(-2)
            + ' ' + ('0' + japaneseTime.getHours()).slice(-2)
            + ':' + ('0' + japaneseTime.getMinutes()).slice(-2),
            japaneseTime2 = new Date(message.created_time * 1000),
            message.created_time = japaneseTime2.getFullYear()
                + '/' + ('0' + (japaneseTime2.getMonth() + 1)).slice(-2)
                + '/' + ('0' + japaneseTime2.getDate()).slice(-2)
                + ' ' + ('0' + japaneseTime2.getHours()).slice(-2)
                + ':' + ('0' + japaneseTime2.getMinutes()).slice(-2)
          )),
          this.users = response.data.users
        ));
        this.users.forEach(user =>
          axios()
            .get('users/' + user.id ,{
              headers: {
                'access-token': localStorage.getItem('access-token'),
                  uid: localStorage.getItem('uid'),
                  client: localStorage.getItem('client'),
              },
            }).then(response=> (
                this.user_names.push(response.data.name),
                this.avatar_urls.push(response.data.avatar_url)
            ))    
        );
    }
  }

</script>
