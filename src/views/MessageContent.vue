<template>
    <v-container>
      <v-row class='mt-3 ml-3'><p class="text-h6"> メッセージ </p></v-row>
        <v-row class='mr-2 mt-0 mb-0'>
            <v-col cols='1'>
                <v-btn icon @click='returnPage'>
                <v-icon>
                    mdi-arrow-left-thick
                </v-icon>
                </v-btn>
            </v-col>
      </v-row>
      <v-divider class='mt-0'/>
      <v-layout wrap class='mt-0'>
      <v-flex xs=12 sm=10 md =6>
        <v-card height='550' rounded="xl" class='mt-3'>
        <v-container fluid>
          <v-row class='mt-1'>
              <v-col class='mt-3 ml-1' cols='2'>
                  <v-img 
                  :src="railsURL + avatar"
                  style="object-fit: cover;"
                  max-height="50"
                  max-width="40"
                  > 
                  </v-img>
              </v-col>
              <v-col> <v-divider vertical/> </v-col>
              <v-col cols='9' class='ml-0'>
                <v-row class='text-h8'>
                  {{from_name}}
                </v-row>
                <v-row class='text-caption'>
                  {{message.title}}
                </v-row>
                <v-row justify="center" class='text-overline ma-0 pa-0'> 
                  {{message.time}}
                </v-row>
                <v-row justify="center" class='text-overline ma-0 pa-0'>
                  <v-icon> mdi-arrow-up </v-icon>
                </v-row>
                <v-row justify="center" class='text-overline ma-0 pa-0'>
                  {{message.created_time}}
                </v-row>
              </v-col>
            </v-row>
          <v-divider class='mt-1'/>
          <v-row class='mt-5 ml-2 mr-2'>
            {{message.body}}  
          </v-row>
          <v-row class='mt-10 ml-2 mr-2'>
            <v-img
                v-bind:src="railsURL + message.image_url"
                height="100"
                width="100"
            >
            </v-img>
          </v-row>
          </v-container>
        </v-card>
      </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import axios from '@/api/index'
import { mapState } from 'vuex'
var japaneseTime = ''
var japaneseTime2 = ''

export default {
    data: () => ({
      message_id: '',
      message: {},
      uploadedImage: '',
      // railsURL: "http://localhost:3000",
      // railsURL: 'https://54.168.35.214',
      avatar: '',
      from_name: ''
    }),
    computed: {
    ...mapState(["user_info", "railsURL"]),
    },
    created(){
        this.message_id = this.$route.params.message_id,
        this.avatar = this.$route.params.avatar_url,
        this.from_name = this.$route.params.from_name
    },
    mounted() { 
      axios()
        .get('/users/' + this.user_info['id'] + '/messages/' + this.message_id,
        {
          headers: this.user_info
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
  },
  methods: {
     returnPage(){
        this.$router.push({name: 'TimeLine'})
    }
  }
}
</script>