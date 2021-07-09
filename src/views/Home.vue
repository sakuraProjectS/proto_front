<template>
  <v-container>
      <v-row class="mt-15">
        <v-col cols=3>
          <v-btn icon @click='sendMessage'>
            <v-icon x-large>
              mdi-email
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols='9'>
          <v-card>
            <v-card-text>
              送信
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-col cols='3'>
          <v-btn icon @click='receiveMessage'>
            <v-icon x-large>
              mdi-bell
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols='9'>
          <v-card>
            <v-card-text>
              受信
            </v-card-text>
            <!-- <v-card-text>
              1/21 おじいちゃんの誕生日
              <br>
              2/2 しおりちゃんの節句
            </v-card-text> -->
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col cols='3'>
          <v-btn icon @click='requestFriend'>
            <v-icon x-large>
              mdi-account-search
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols='9'>
          <v-card>
            <v-card-text>
              フレンド申請
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

       <v-row class="mt-10">
        <v-col cols='3'>
          <v-btn icon @click='showProfile'>
            <v-icon x-large>
              mdi-account
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols='9'>
          <v-card>
            <v-card-text>
              プロフィール
            </v-card-text>
          </v-card>
        </v-col>
       </v-row>
       <v-row class="mt-10"> 
        <v-col cols='3'>
          <v-btn icon @click='inviteFamiliy'>
            <v-icon x-large>
              mdi-account-plus
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols='9'>
          <v-card>
            <v-card-text>
              家族を招待
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
      <!-- <v-row class="mt-15">
        <v-col >
          <v-icon x-large>
            mdi-cog
          </v-icon>
        </v-col>
        <v-col>
          <v-card>
            <v-card-text>
              設定
            </v-card-text>
          </v-card>
        </v-col>
        <v-col >
          <v-icon x-large>
            mdi-star
          </v-icon>
        </v-col>
        <v-col>
          <v-card>
            <v-card-text>
              みんなのSAKURAの使い方
            </v-card-text>
          </v-card>
        </v-col>
      </v-row> -->
  </v-container>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  methods: {
    showProfile(){
      this.$router.push({name: 'Profile'})
    },
    inviteFamiliy(){
      this.$router.push({name: 'ShowRequest'})
    },
    sendMessage(){
      this.$router.push({name: 'Send'})
    },
    receiveMessage(){
      this.$router.push({name: 'TimeLine'})
    },
    requestFriend(){
      this.$router.push({name: 'ShowRequest'})
    }
  }
}
</script>
