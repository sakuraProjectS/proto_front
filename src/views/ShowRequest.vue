<template>
    <v-container>
      <v-card class='mt-8'>
        <v-card-title>
          家族を検索
        </v-card-title>
        <v-card-text>
          <v-text-field
            outlined
            v-model="mail"
            label='メールアドレス'
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click='searchUser'>
            検索
          </v-btn>
        </v-card-actions>
        <v-col>
        {{userSearched.name}}
        </v-col>
        <v-col>
          <v-btn v-if="userSearched.id > 0"  @click='followFeind(userSearched.id)'>
            申請
          </v-btn>   
        </v-col>   
      </v-card>

       <v-card class='mt-8'>
         <v-card-title>
           フレンド申請中
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
          申請されいているフレンド
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

export default {
  data () {
    return {
      toFriend: {},
      fromFriend: {},
      status: '',
      userSearched: {},
      mail: '',
    }
  },

  mounted() {
    axios()
    .get('/users/' + localStorage.getItem('id') + '/followings',
    {
      headers: {
          'access-token': localStorage.getItem('access-token'),
          uid: localStorage.getItem('uid'),
          client: localStorage.getItem('client'),
      },
    },
    )
    .then(response => (this.toFriend = response.data , console.log(response.data))),
    
    axios()
    .get('/users/' + localStorage.getItem('id') + '/followers',
    {
      headers: {
          'access-token': localStorage.getItem('access-token'),
          uid: localStorage.getItem('uid'),
          client: localStorage.getItem('client'),
      },
    },
    )
    .then(response => (this.fromFriend = response.data , console.log(response.data)))
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
             this.$router.go({path: this.$router.currentRoute.path, force: true})
        ))
    },
    acceptFriend(id){
        console.log(id)
        axios().put('/users/' + id +'/relationships', {
          status: 'true'
        },
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
            this.$router.go({path: this.$router.currentRoute.path, force: true})
        ))
    },
    searchUser(){
        axios().get('/users/' + localStorage.getItem('id') +'/search', {
          params:{email: this.mail}
        },
        {
            headers: {
            'access-token': localStorage.getItem('access-token'),
                uid: localStorage.getItem('uid'),
                client: localStorage.getItem('client'),
            },
        }
        )
        .then(response => (
            console.log(response),
            this.userSearched = response.data, 
            console.log(this.userSearched),
            this.$router.go({path: this.$router.currentRoute.path, force: true})
        ))
    },
    followFeind(id){
        console.log(id)
      axios().post('/users/' + id +'/relationships', {
        user_id: id
      }, 
      {
        headers: {
           'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client'),
          },
      }
      )
      .then(response => (console.log(response)))
    },
  },
}
</script>