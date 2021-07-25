<template>
    <v-container>
        <v-row justify="center" class="mt-5">
            <img src="../assets/img/sakura-logo.png" width="180" height="180">
        </v-row>
        <v-layout wrap class='justify-center'>
          <v-flex xs12 sm10 md8>
            <v-row class="ml-3 mr-3 mt-7">
                <v-col>
                    <v-text-field
                        v-model="lastname"
                        label="姓"
                        outlined
                        filled
                        rounded
                        background-color="grey lighten-5"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="firstname"
                        label="名"
                        outlined
                        filled
                        rounded
                        background-color="grey lighten-5"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row class="ml-3 mr-3 mt-n7"> 
                <v-col>
                    <v-text-field
                        v-model="email"
                        label="メールアドレス"
                        outlined
                        filled
                        rounded
                        background-color="grey lighten-5"
                    ></v-text-field>
                </v-col>
            </v-row>
              <v-row class="ml-3 mr-3 mt-n7"> 
                <v-col>
                    <v-text-field
                        v-model="password"
                        type="password"
                        label="パスワード"
                        outlined
                        filled
                        rounded
                        background-color="grey lighten-5"
                    ></v-text-field>
                </v-col>
              </v-row>
          </v-flex>
        </v-layout>
        <div class="text-center">
            <v-row class="mt-n5" align="center"> 
                <v-col>
                    <v-btn
                        depressed
                        rounded
                        color="blue lighten-3"
                        x-large
                        @click="signIn"
                    >
                        ログイン
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="mt-n1" align="center"> 
                <v-col>
                    <v-btn
                        depressed
                        rounded
                        color="grey lighten-2"
                        x-large
                        @click="signUp"
                    >
                        新規ユーザー登録
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class='justify-center'>
              <v-switch
                v-model="login_status"
                class="ma-1"
                label="次回から自動ログインする"
              ></v-switch>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import axios from '@/api/index'


export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      name: "",
      email: "",
      password: "",
      user: {},
      login_status: false,
    };
  },

  // mounted() {
  //     if (this.$store.state.login_status) {
  //       this.$router.push({name: 'TimeLine'})
  //     }
  // },

  methods: {
    async signUp() {
      this.name =this.lastname + " " +this.firstname

      await axios()
        .post("/auth", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response)
          this.user = {
            uid: response.headers["uid"],
            "access-token": response.headers["access-token"],
            client: response.headers["client"],
            id: response.data.data["id"],
          },
          this.$store.dispatch('userLogin', this.user)
        });
      await axios().put('/users/' + this.user["id"], {
        email: this.email,
        password: this.password,
        name: this.name
      },
      {
        headers: {
           'access-token': this.user["access-token"],
            uid: this.user["uid"],
            client: this.user["client"],
          },
      }
      )
      this.$store.dispatch('keepLogin', this.status)
      if (this.email == this.user["uid"]){
            this.$router.push({name: 'TimeLine'})
      }
    },

    signIn() {
      axios()
        .post("/auth/sign_in", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.user = {
            uid: response.headers["uid"],
            "access-token": response.headers["access-token"],
            client: response.headers["client"],
            id: response.data.data["id"],
          },
          console.log(this.login_status)
          this.$store.dispatch('userLogin', this.user)
          this.$store.dispatch('keepLogin', this.login_status)
          if (this.email == this.user["uid"]){
            this.$router.push({name: 'TimeLine'})
          }
        });    
    },
  },
};
</script>

