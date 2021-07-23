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
                v-model="auto"
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
      title: "",
      content: "",
      tasks: [],
      comment: "",
      posts: [],
      user: {},
      auto: "",
    };
  },
  methods: {
    async signUp() {
      this.name =this.lastname + " " +this.firstname
      console.log(this.name)
      await axios()
        .post("/auth", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem(
            "access-token",
            response.headers["access-token"]
          );
          localStorage.setItem("client", response.headers["client"]);
          localStorage.setItem("uid", response.headers["uid"]);
          localStorage.setItem("id", response.data.data["id"]);
          this.user = {
            uid: response.headers["uid"],
            "access-token": response.headers["access-token"],
            client: response.headers["client"],
            id: response.data.data["id"],
          },
        
          console.log(this.user),
          this.$store.dispatch('userLogin', this.user)
          this.$store.commit('setMessage', {
          status: false,
        })
        }
        );
      this.id = localStorage.getItem('id')
      console.log(this.id)
      await axios().put('/users/' + this.id, {
        email: this.email,
        password: this.password,
        name: this.name
      },
      {
        headers: {
           'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client'),
          },
      }
      )
      if (this.email == localStorage.getItem("uid")){
            this.$router.push({name: 'TimeLine'})
      }
    },
    signIn() {
      console.log(this.email);
      console.log(this.password);
      axios()
        .post("/auth/sign_in", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem(
            "access-token",
            response.headers["access-token"]
          );
          localStorage.setItem("client", response.headers["client"]);
          localStorage.setItem("uid", response.headers["uid"]);
          localStorage.setItem("id", response.data.data["id"]);
          this.user = {
            uid: response.headers["uid"],
            "access-token": response.headers["access-token"],
            client: response.headers["client"],
          },
          this.$store.dispatch('userLogin', this.user)
          this.$store.commit('setMessage', {
          status: false,
        })
          if (this.email == response.headers["uid"]){
            this.$router.push({name: 'TimeLine'})
          }
        });    
    },
    
  },
};
</script>

