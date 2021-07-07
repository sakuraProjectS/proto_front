<template>
    <v-container >
       <v-row justify="space-around">
        <v-card-text>
          <div class="font-weight-bold">
            2021
          </div>
          <v-timeline
            align-top
            :dense="$vuetify.breakpoint.smAndDown"
          >
            <v-timeline-item
              v-for="(message, index) in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <v-card>
                  <v-row>
                    <v-col cols='2'>
                        <v-avatar> 
                            <img
                            :src="railsURL + avatar_urls[index]"
                            style="object-fit: cover;"
                            >
                        </v-avatar> 
                    </v-col>
                    <v-col cols='10'>
                      <v-card-subtitle>
                        {{message.time}} ← {{message.created_time}}
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                   <v-card-title class="justify-center">
                      {{message.title}}
                  </v-card-title>
                  <v-card-actions>
                    <v-btn @click='showContent(message, index)'>
                      開く
                    </v-btn>
                    <v-btn @click='deleteMessage(message)'>
                      削除
                    </v-btn>
                  </v-card-actions>
                </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      
    </v-row>
    <v-btn
        icon
        @click="lookSending"
    >
        <v-icon> mdi-star</v-icon>
    </v-btn>
    </v-container>
</template>


<script>
var japaneseTime = ''
var japaneseTime2 = ''

import axios from '@/api/index'

  export default {
    data: () => ({
      messages: [],
      dialog: false,
      railsURL: "http://localhost:3000",
      users: [],
      avatar_urls: [],
    }),
    methods: {
        saveComment(){
            console.log('aaaaa')
            console.log(this.messages)
        },
        lookSending(){
            this.$router.push({name: "Sending"})
        },
        showContent(m, index){
          this.$router.push({
            name: 'MessageContent',
            params: {message_id: m.id, avatar_url: this.avatar_urls[index]}
          })
        },
        deleteMessage(m){
          axios().
          delete('/messages/' + m.id,
          {
              headers: {
                  'access-token': localStorage.getItem('access-token'),
                  uid: localStorage.getItem('uid'),
                  client: localStorage.getItem('client'),
              },
          },
          ).then(response => {
            console.log(response) 
            this.$router.go({path: this.$router.currentRoute.path, force: true})
          }).catch(e => {
            console.log(e)
          })
        }
    },
    async mounted() {
      await axios()
        .get('/users/' + localStorage.getItem('id') + '/messages',{
          headers: {
            'access-token': localStorage.getItem('access-token'),
              uid: localStorage.getItem('uid'),
              client: localStorage.getItem('client'),
          },
        },
        )
        .then(response => (
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
              this.avatar_urls.push(response.data.avatar_url)
            ))    
        );
    }
  }
</script>
