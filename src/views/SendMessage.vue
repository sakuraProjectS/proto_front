<template>
  <v-container>
    <v-row justify="center" class='mt-10'>
      <v-col cols="2">
        <v-avatar size='100'>
            <img src="~@/assets/icon/cat.jpg">
        </v-avatar>
      </v-col>
      <v-col cols="5">
        <div class='text-h4'>
        <v-text-field
          outlined
          v-model="title"
          label="件名"
        ></v-text-field>
        </div>
        <v-row>
          <v-col>
            <v-select
              v-model="year"
              :items="yearrange"
              label="年"
            ></v-select>
          </v-col>
        
          <v-col>
            <v-select
              v-model="month"
              :items="monthrange"
              label="月"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              v-model="day"
              :items="daysrange"
              label="日"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              v-model="hour"
              :items="hoursrange"
              label="時"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              v-model="minute"
              :items="minutesrange"
              label="分"
            ></v-select>
          </v-col>
        </v-row>
    </v-col>

    <v-col>
          <p>
            <label>画像</label>
            <input name="uploadedImage" type="file" ref="file" accept="image/png, image/jpeg" @change="onFileChange"><br />
            <!-- <v-btn @click='postItem'>
                アップロード
            </v-btn> -->
        </p>
    </v-col>
    
            
</v-row>

    <v-row>
        <v-container fluid>
          <v-textarea
            v-model='body'
            counter
            label="メッセージ"
            height="300"
            :value="value"
            outlined
          ></v-textarea>
        </v-container>
    </v-row>
  
    <v-row justify="end">
      <v-card-actions>
        <v-btn outlined text v-on:click="sendMessage">送信する</v-btn>
        <!-- <span v-if="suceess">送信成功</span> -->
      </v-card-actions> 
      <!-- /送信ボタン -->
    </v-row>
  
  </v-container>
</template>


<script>
// import AppBackgroundHolder from '../components/AppBackgroundHolder.vue'
import axios from '@/api/index'
import { mapState } from 'vuex'


const year_start = 2021
const year_end = 2100
const ageRange = new Array(year_end - year_start + 1).fill(null).map((_, i) => i + year_start)
const month_start = 1
const month_end = 12
const monthRange = new Array(month_end - month_start + 1).fill(null).map((_, i) => i + month_start)
const day_start = 1
const day_end = 31
const daysRange = new Array(day_end - day_start + 1).fill(null).map((_, i) => i + day_start)
const hoursRange = [...Array(24)].map((_, i) => i) 
const minutesRange = [...Array(60).keys()]

export default {
  props: ['to_id'],
  data () {
    return {
      head: 'メッセージ送信',
      // rules: [v => v.length <= 25 || 'Max 25 characters'],
      value: null,
      item_minutes: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5'
      ],
      user: [],
      select: '',
      to: '',
      body: '',
      year: '2021',
      yearrange: ageRange,
      month: '6',
      monthrange: monthRange,
      day: '3',
      daysrange: daysRange,
      hour: '',
      hoursrange: hoursRange,
      minute: '',
      minutesrange: minutesRange,
      time: [],
      title: [],
      message: {},
      uploadedImage: '',
      railsURL: "http://localhost:3000"
    }
  },
  computed: {
    ...mapState(['user_token'],),
  },
  mounted() {
    axios()
      .get('/users/' + this.to_id,{
        headers: {
           'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client'),
        },
      },
      console.log(this.user_token)
      )
      .then(response => (this.user = response.data , console.log(response)))
  },
  methods: {
      sendMessage(){
      var date = new Date(this.year, this.month - 1, this.day, this.hour, this.minute)
      let formData = new FormData();
      formData.append('image', this.uploadedImage);
      formData.append('from_id', localStorage.getItem('id'));
      formData.append('to_id', this.to_id);
      formData.append('title', this.title);
      formData.append('body', this.body);
      formData.append('time', date.getTime() / 1000);
      axios().post('/users/' + localStorage.getItem('id') + '/messages', formData, {
        headers: {
           'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client'),
          },
      }
      )
      .then(response => ( 
            console.log(response.data),
            this.$router.push({name: 'Send'})
        ))

    },
    onFileChange(e) {
        e.preventDefault();
        let files = e.target.files;
        this.uploadedImage = files[0];
        console.log(files)
        console.log(this.uploadedImage)
     }
  },
}
</script>

<style>
  .m {
    margin-top: 10px;
  }
</style>