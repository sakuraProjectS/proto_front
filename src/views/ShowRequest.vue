<template>
    <v-container>
      <v-row class='mt-3 ml-3'>
          <p class="text-h6"> 大切な人を検索 </p>
      </v-row>
      <v-row>
          <v-btn icon @click='returnPage'>
              <v-icon>
                  mdi-arrow-left-thick
              </v-icon>
          </v-btn>
      </v-row>
      <v-divider class='mt-4'/>
      <v-card class='mt-8'>
        <v-container>
          <v-row class='ml-2 mt-2 mr-2'>
            <v-text-field
              outlined
              v-model="mail"
              label='メールアドレス'
            >
            </v-text-field>
          </v-row>
          <v-row justify="end" class='mr-1 mt-0 mb-2'>
              <v-btn @click='searchUser'>
                検索
              </v-btn>
          </v-row>
          <div v-if='userSearched.id' class='mt-2'>
            <v-row>
              <v-col cols='9'>
                {{userSearched.name}}
              </v-col>
              <v-col cols='3'>
                <v-btn icon @click='dialog=true'>
                  <v-icon> mdi-account-plus </v-icon>
                </v-btn>   
              </v-col>   
            </v-row>
            <!-- <v-row v-if="tmp_status===true">
              <v-card-text>
              {{flash_message}}
              </v-card-text>
            </v-row> -->
            <v-dialog
              :retain-focus="false"
              v-model="dialog"
              persistent
              max-width="600px"
              >
              <v-card>
                  <v-container>
                    <v-card-title> フレンド申請</v-card-title>
                    <v-select
                      :items="items"
                      label="あなたとの関係"
                      v-model="select"
                    ></v-select>
                    <v-row justify="end" class='mt-3 mb-3 mr-2'>
                      <v-btn icon @click='followFriend' large>
                          <v-icon>
                              mdi-account-plus
                          </v-icon>
                      </v-btn>
                      <v-btn @click="dialog = false" icon large>
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                    </v-row>
                </v-container>
              </v-card>
          </v-dialog>
          </div>

        </v-container>
      </v-card>
       <v-card class='mt-8'>
         <v-card-title>
           申請中
         </v-card-title>
        <v-list>
          <v-list-item
          v-for="(item, i) in toFriend"
          :key=i
        >
            <v-list-item-content>
              <v-list-item-title>
                {{item.name}}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn @click='destroyFriend(item.id)'>
                    削除
                </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>

      <v-card class='mt-8'>
        <v-card-title>
          保留中
        </v-card-title>
        <v-list>
          <v-list-item
          v-for="(item, i) in fromFriend"
          :key=i
        >
            <v-list-item-content>
              <v-list-item-title>
                {{item.name}}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn @click='acceptFriend(item.id)'>
                    承諾
                </v-btn>
                <v-btn @click='destroyFriend(item.id)'>
                    削除
                </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>

    </v-container>
</template>


<script>
import axios from '@/api/index'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      toFriend: {},
      fromFriend: {},
      status: '',
      userSearched: {},
      mail: '',
      tmp_status: '',
      flash_message: '',
      dialog: false,
      items: ['家族以外', '親', '子', '祖父母', '孫', '叔父叔母', '甥姪', 'いとこ'],
      select: '',
      follower_relation: 0,
      followed_relation: 0,
    }
  },

  computed: {
    ...mapState(["user_info"]),
  },

  mounted() {
    axios()
    .get('/users/' + this.user_info['id'] + '/followings',
    {
      headers: this.user_info
    },
    )
    .then(response => (this.toFriend = response.data)),
    
    axios()
    .get('/users/' + this.user_info['id'] + '/followers',
    {
      headers: this.user_info
    },
    )
    .then(response => (this.fromFriend = response.data))
  },

  methods: {
    destroyFriend(id){
        console.log(id)
        axios().delete('/users/' + id +'/relationships',  
        {
            headers: {
            'access-token': localStorage.getItem('access-token'),
                uid: localStorage.getItem('uid'),
                client: localStorage.getItem('client'),
            },
        }
        )
        .then(response => (
            this.status = response.data.status, 
            console.log(response),
            // this.$router.go({path: this.$router.currentRoute.path, force: true})
            this.$router.push({name: 'Send'})
        ))
    },
    acceptFriend(id){
        console.log(id)
        axios().put('/users/' + id +'/relationships', {
          status: 'true'
        },
        {
            headers: this.user_info
        }
        )
        .then(response => (
            this.status = response.data.status, 
            // this.$router.go({path: this.$router.currentRoute.path, force: true})
            this.$router.push({name: 'Send'})
        ))
    },
    searchUser(){
        axios().get('/users/' + localStorage.getItem('id') +'/search', {
          params:{email: this.mail}
        },
        {
          headers: this.user_info
        }
        )
        .then(response => (
            console.log(response),
            this.userSearched = response.data, 
            console.log(this.userSearched)
        ))
    },
    async followFriend(){
      console.log(this.userSearched.id)
      console.log(this.select)
      switch (this.select) {
        case '家族以外':
          this.followed_relation = 0
          this.follower_relation = 0
          break
        case '親':
          this.followed_relation = 1
          this.follower_relation = 2
          break
        case '子':
          this.followed_relation = 2
          this.follower_relation = 1
          break
        case '祖父母':
          this.followed_relation = 3
          this.follower_relation = 4
          break
        case '孫':
          this.followed_relation = 3
          this.follower_relation = 4
          break
        case '叔父叔母':
          this.followed_relation = 5
          this.follower_relation = 6
          break
        case '甥姪':
          this.followed_relation = 5
          this.follower_relation = 6
          break
        case 'いとこ':
          this.followed_relation = 7
          this.follower_relation = 7
          break
      }
    
      await axios().post('/users/' + this.userSearched.id +'/relationships', {
        user_id: this.userSearched.id,
        follower_relation: this.follower_relation,
        followed_relation: this.followed_relation
      }, 
      {
        headers: this.user_info
      }
      )
      .then(response => (
        this.tmp_status = response.data.status
      ));
        console.log(this.tmp_status)
        if(this.tmp_status == true){
        console.log('aaa')
        this.flash_message = 'すでに登録されています'
      }else{
        this.$router.push({name: 'Send'})
      }
    },
    returnPage() {
      this.$router.push({name: 'Send'})
    }
  },
  
}
</script>