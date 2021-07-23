<template>
    <v-container fluid fill-height class='bg'>
        <v-row class='mt-3 ml-3'><p class="text-h6"> プロフィール </p></v-row>
        <v-row class='mr-2 mt-0 mb-0'>
            <v-col cols='1'>
                <v-btn icon @click='returnPage'>
                <v-icon>
                    mdi-arrow-left-thick
                </v-icon>
                </v-btn>
            </v-col>
            <v-col cols='10'></v-col>
            <v-col cols='1'>
                <v-btn @click='editProfile' icon>
                    <v-icon> mdi-pen </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-layout wrap class='justify-center'>
            <v-flex xs12 sm9 md6>
            <v-divider class='mt-0'/>
            <v-row v-if="profile.avatar" justify="center" class="mb-5 mt-5">
                <v-avatar size='100'>
                    <v-img
                    v-bind:src="railsURL + profile.avatar"
                    >
                    </v-img>
                </v-avatar>
            </v-row>
            <v-row v-else justify="center" class="mb-5 mt-5">
                <v-avatar size='100'>
                    <v-img
                    src="@/assets/icon/kame.jpg"
                    >
                    </v-img>
                </v-avatar>
            </v-row>
            <v-card
                height = "450"
                rounded="xl"
            >
                <v-container>
                    <v-row>
                        <v-col>
                            <v-list two-line>
                                <template v-for="(item, key, index) in items">
                                    <v-list-item :key = key>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{key}}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                {{item}}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider
                                        v-if="index < Object.keys(items).length"
                                        :key="item"
                                    ></v-divider>
                                </template>
                            </v-list>
                        </v-col>
                    </v-row>  
                </v-container>
            </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from '@/api/index'
// import { mapState } from 'vuex'

export default {
    data: () => ({

      profile:{
          avatar : '',
      },
 
    //   comment: '卒業まであとわずか．\n２月にイタリアへの卒業旅行，ちゃんと行けるかなー',
      post: {},
      uploadedImage: '',
      items: {},
    //   railsURL: 'https://13.114.43.226'
      railsURL: "http://localhost:3000"
    }),
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
            this.profile.avatar = response.data.avatar_url, 
            // this.profile.birthdate = response.data.birthdate,
            this.items['Name'] = response.data.name,
            this.items['Date of birth'] = response.data.birthdate,
            this.items['E-mail'] = response.data.email,
            console.log(this.items)
    )
    );
  },
  methods: {
      editProfile(){
          console.log(this.profile.avatar)
          console.log(this.items['Name'])
          console.log(this.items['Date of birth'])
          this.$router.push({name: 'ProfileEdit'})
      },
      returnPage(){
        this.$router.push({name: 'TimeLine'})
    }
    }
}
</script>

<style>
  .rounded-card{
    border-radius:50px;
}
.test2{

position: absolute;
bottom: 20px;
margin: 0px;
padding: 0px;
right: 20px;
}
</style>