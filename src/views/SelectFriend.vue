<template>
  <v-container>
    <v-row class='mt-3 ml-3'>
        <p class="text-h6"> 連絡先 </p>
    </v-row>
    <v-row class='mr-2 mt-0'>
      <v-col cols='1'>
        <v-btn icon @click='returnPage'>
          <v-icon>
            mdi-arrow-left-thick
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols='10'></v-col>
      <v-col cols='1'>
        <v-btn icon @click='showRequest'>
          <v-icon>
            mdi-account-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider/>
    <v-row class='mt-3'> 
      <v-layout wrap class='justify-center align-center'>
        <v-flex xs12 sm10 md10>
          <v-card color="rgb(0, 0, 0, 0)" elevation='0'>
          <v-list color="rgb(0, 0, 0, 0)" two-line>
            <template  v-for="(item) in frineds">
              <v-list-item
                :key="item.name"
              >   
                <v-row>
                  <v-col>
                    <v-row>
                      <v-list-item-icon>
                          <v-avatar size="50">
                              <img
                                :src="railsURL + item.avatar_url"
                              >
                          </v-avatar>
                        </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class='text-h8'> {{item.name}}</v-list-item-title>
                        <v-list-item-subtitle> {{item.birthdate}}</v-list-item-subtitle>
                      </v-list-item-content> 
                    </v-row>
                  </v-col>
                  <v-col cols='1' class='mr-1 mt-3'>
                    <v-btn icon @click='showProfile(item.id)'>
                      <v-icon>
                        mdi-alpha-i-circle
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols='1' class='mr-5 mt-3'>
                    <v-btn @click='editMessage(item.id)' icon>
                      <v-icon>
                        mdi-email
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item>
            </template>
          </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/api/index'
import {mapState} from 'vuex'

export default {
    data: () => ({
        frineds: {},
        dialog: false,
        select: {
          'name': null,
          'avatar': null,
          'birthdate': null
        },
    }),
    async mounted() {
    await axios()
      .get('/family/' + this.user_info["id"],
      {
        headers: this.user_info
      },
      )
      .then(response => (
        this.frineds = response.data.friends
    )
    );
  },
    methods: {
      editMessage(id) {
        this.$router.push({name: 'SendMessage', params: {to_id: id}})
      },      
      showProfile(id) {
        this.$router.push({name: 'FriendProfile', params: {profile_id: id}})
      },     
      showRequest() {
        this.$router.push({name: 'ShowRequest'})
      },
      returnPage() {
        this.$router.push({name: 'TimeLine'})
      }
    },
   computed: {
        ...mapState(["user_info", "railsURL"]),
    }
}
</script>