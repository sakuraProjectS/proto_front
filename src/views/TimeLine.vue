<template>
    <v-container>
       <v-row class='mt-3 ml-3'>
            <p class="text-h6"> ホーム </p>
        </v-row>
       <v-row justify="end">
          <v-col cols='2'>
            <v-btn icon>
                <v-icon large>
                    mdi-bell-outline
                </v-icon>
            </v-btn>
          </v-col>
          <v-col cols='2'>
            <v-btn icon >
                <v-icon large>
                    mdi-pencil-outline
                </v-icon>
            </v-btn>
          </v-col>
          <v-col cols='2'>
            <v-btn icon @click='showFriend'>
                <v-icon large>
                    mdi-account-multiple-outline
                </v-icon>
            </v-btn>
          </v-col>
          <v-col v-if="myavatar" cols='2'>
            <v-btn icon @click='showProfile'>
                <v-avatar size='30'>
                  <v-img
                  v-bind:src="railsURL + myavatar"
                  >
                  </v-img>
                </v-avatar>
            </v-btn>
          </v-col>
          <v-col v-else cols='2'>
            <v-btn icon @click='showProfile'>
                <v-avatar size='30'>
                  <v-img
                  src="@/assets/icon/kame.jpg"
                  >
                  </v-img>
                </v-avatar>
            </v-btn>
          </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center" class='mt-5 mb-3'> 
        <v-tab v-if='content > 0'>
          <v-badge
            color="pink"
            icon="mdi-heart"
          >
          <v-badge
            color='pink'
            :content="content"
            bottom
          >
            <v-img
              src='@/assets/icon/kame.jpg'
              max-height="100"
              max-width="100"
            >
            </v-img>
          </v-badge>
          </v-badge>
        </v-tab>
        <v-tab v-if='content === 0'>
          <v-badge
            color="pink"
            icon="mdi-heart"
          >
            <v-img
              src='@/assets/icon/kame.jpg'
              max-height="100"
              max-width="100"
            >
            </v-img>
          </v-badge>
        </v-tab>
      </v-row>
      <v-layout wrap>
      <v-flex v-for="(message, index) in sortedmessages" :key="message.time" xs12 sm9 md6 class='mt-5'>
        <!-- <v-alert outlined color="yellow darken-3" height="100" rounded="xl" width="100%"> -->
          <v-row align="center" justify="center" class='ma-1 mt-15'>
            <v-btn @click='showContent(message, index)' icon> 
            <v-card height='95' rounded="xl" width="100%">
              <v-container>
                <v-row>
                  <v-col class='mt-3 ml-1' cols='2'>
                      <v-img 
                      :src="railsURL + avatar_urls[index]"
                      style="object-fit: cover;"
                      max-height="40"
                      max-width="40"
                      > 
                       
                      </v-img>
                  </v-col>
                  <v-col> <v-divider vertical/> </v-col>
                  <v-col cols='9' class='ml-0'>
                    <v-row class='text-h8'>
                      {{users_name[index]}}
                    </v-row>
                    <v-row class='text-caption'>
                      {{message.title}}
                    </v-row>
                    <v-row justify="center" class='text-overline'> 
                      {{message.time}}←{{message.created_time}}
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            </v-btn>
          </v-row>
        <!-- </v-alert> -->
      </v-flex>
      </v-layout>
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
      // railsURL: 'https://13.114.43.226',
      users: [],
      avatar_urls: [],
      users_name: [],
      myavatar: '',
      sending_messages: [],
      content: '',
      sortedMessages: []
    }),
    methods: {
        saveComment(){
            console.log('aaaaa')
            console.log(this.messages)
        },
        showFriend(){
          this.$router.push({name: "Send"})
        },
        showProfile(){
          this.$router.push({name: "Profile"})
        },
        showContent(m, index){
          this.$router.push({
            name: 'MessageContent',
            params: {message_id: m.id, avatar_url: this.avatar_urls[index], from_name: this.users_name[index]}
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
        .get('/profile/' + localStorage.getItem('id'),
        {
          headers: {
            'access-token': localStorage.getItem('access-token'),
              uid: localStorage.getItem('uid'),
              client: localStorage.getItem('client'),
          },
        },
        )
        .then(response => (
              // this.profile.name = response.data.name, 
              this.myavatar = response.data.avatar_url, 
              // this.profile.birthdate = response.data.birthdate,
              console.log(this.myavatar)
      )
      );
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
              this.users_name.push(response.data.name),
              this.avatar_urls.push(response.data.avatar_url),
              console.log(response)
            ))    
        );
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
          this.sending_messages = response.data.messages,
          this.content = this.sending_messages.length
        ))
    },
    computed: {
     sortedmessages(){
        return this.messages.slice().sort((a, b) => {
          return (a.time > b.time) ? -1 : (a.time < b.time) ? 1 : 0;
        })
    }
  }
  }
</script>
