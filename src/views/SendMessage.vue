<template>
  <v-container>
    <v-row class='mt-3 ml-3'>
        <p class="text-h6"> メッセージ </p>
    </v-row>
  <v-row class='mr-2 mt-0'>
    <v-col cols='1'>
      <v-btn icon @click='returnPage'>
        <v-icon>
          mdi-arrow-left-thick
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
  <v-divider class='mt-3'/>
  <v-card height='550' class='mt-3'>
    <v-alert outlined color="yellow darken-3" height="550">
      <v-row class='mt-0'>
        <v-col cols="2">
          <v-avatar size='50'>
            <img :src="railsURL + user.avatar_url">
          </v-avatar>
        </v-col>
        <v-col>
          <v-text-field
            outlined
            v-model="title"
            label="件名"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
       <v-col>
        <v-select
          v-model="year"
          :items="yearrange"
          label="年"
          height="20"
          dense
        />
        </v-col>
        <v-col>
          <v-select
            v-model="month"
            :items="monthrange"
            label="月"
            height="20"
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="day"
            :items="daysrange"
            label="日"
            height="20"
            dense
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="hour"
            :items="hoursrange"
            label="時"
            height="20"
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="minute"
            :items="minutesrange"
            label="分"
            height="20"
            dense
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <input name="uploadedImage" type="file" ref="file" accept="image/png, image/jpeg" @change="onFileChange"><br />
        </v-col>
      </v-row>
      <v-row>
        <v-container fluid>
          <v-textarea
            v-model='body'
            counter
            label="メッセージ"
            :value="value"
            outlined
          ></v-textarea>
        </v-container>
      </v-row>
      <v-row justify="end" class='mt-0'>
          <v-btn outlined text @click="saveMessage"> 保存する </v-btn>
          <v-btn outlined text v-on:click="sendMessage">送信する</v-btn>
      </v-row>
    </v-alert>
    </v-card>
  </v-container>
</template>


<script>
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
      uploadedImage: '',
    }
  },
  computed: {
    ...mapState(['user_info', "railsURL", "message"],),
  },
  mounted() {
    axios()
      .get('/users/' + this.to_id,{
        headers: this.user_info
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
      axios().post('/users/' + this.user_info['id'] + '/messages', formData, {
        headers: this.user_info
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
     },
     returnPage() {
        this.$router.push({name: 'Send'})
      },
    saveMesage(){
      const tmp = {
        title: this.title,
        body: this.body,
        year: this.year,
        month: this.month,
        day: this.day,
        hour: this.hour,
        minute: this.minute,
        to_id: this.to_id,
        image: this.image
      }
      this.$store.dispatch('saveMessage', tmp)
    }
  },
}
</script>

<style scoped>
 .v-select input{
   font-size: 1.0pm;
 }
</style>