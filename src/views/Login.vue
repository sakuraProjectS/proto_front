<template>
    <v-container fill-height class="login mt-5">
      <v-row justify="center">
          <img src="../assets/img/sakura-card.png" width="180" height="180">
      </v-row>

      <v-container class="cont">
        <v-form recontainerf="checkForm">
          <v-row>
            <v-icon>
              mdi-account
            </v-icon>
            <v-col>
              <v-text-field
              v-model="lastname"
              label="姓"
              outlined
              filled
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
              v-model="firstname"
              label="名"
              outlined
              filled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-icon>
              mdi-email
            </v-icon>
            <v-col>
              <v-text-field
              v-model="email"
              label="メールアドレス"
              outlined
              filled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>    
            <v-icon>
              mdi-key
            </v-icon>
            <v-col>
              <v-text-field
              v-model="password"
              type="password"
              label="パスワード"
              outlined
              filled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class='mb-2'> 
            <v-col>
              <v-btn class="mr-6" @click="signUp">新規登録</v-btn>
              <v-btn class="ml-6" @click="signIn">ログイン</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
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
            this.$router.push({name: 'Home'})
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
            this.$router.push({name: 'Home'})
          }
        });    
    },
    
  },
};
</script>

<style  lang="scss" scoped>
.login {
  background-image: url("~@/assets/back/login.png");
  background-size: 95% 95%;
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
  text-transform: uppercase;
  // display: block;
  // font-size: 92px;
  // color: #f1ebe5;
  // text-shadow: 0 8px 9px #c4b59d, 0px -2px 1px #fff;
  // font-weight: bold;
  // letter-spacing: -4px;
  // text-align: center;
  // position: absolute;
  // padding: 300px 300px;
  // top: 15%;
  // left: 50%;
  // transform: translate(-50%,-50%);
  // border-radius: 20px;
}

  .cont {
  // background-image: url("~@/assets/back/login.png");
  width: 60%;
  }
</style>
