<template>
    <v-container fluid fill-height class='bg'>
        <v-col>           
            <v-card
               class="mx-auto"
                max-width="400"
            >
                <v-img
                v-bind:src="railsURL + profile.avatar"
                height="300px"
                >
                    <v-card-actions>
                        <v-btn
                            icon
                            @click="dialog_avatar = true"
                        >
                            <v-icon>mdi-camera</v-icon>
                        </v-btn>
                        <v-dialog
                            :retain-focus="false"
                            v-model="dialog_avatar"
                            persistent
                            max-width="600px"
                            >
                            <v-card>
                                <v-card-title>
                                    プロフィール画像を変更
                                </v-card-title>
                                <input name="uploadedImage" type="file" ref="file" accept="image/png, image/jpeg" @change="onFileChange"><br />
    
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn icon @click='postItem'>
                                    <v-icon>
                                        mdi-book
                                    </v-icon>
                                </v-btn>
                                <v-btn
                                    @click="dialog_avatar = false"
                                    icon
                                >
                                    <v-icon>
                                        mdi-close
                                    </v-icon>
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card-actions>
                </v-img>
               
                <v-card-title>
                    {{profile.name}}
                </v-card-title>
                <v-row>
                    <div v-if="profile.birthdate">
                    <v-card-subtitle>
                        {{profile.birthdate}}
                    </v-card-subtitle>
                    <v-card-actions>
                    <v-btn
                            @click="dialog = true"
                        >
                            変更
                        </v-btn>
                        <v-dialog
                            v-model="dialog"
                            persistent
                            >
                            <v-card>
                                <v-card-title>
                                <span class="headline">生年月日</span>
                                </v-card-title>
                                <v-card-text>
                                <v-container>
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
                                    </v-row>
                                </v-container>
                            
                                </v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    icon
                                    dialog = "false"
                                    @click='registerBirthdate'
                                >
                                    <v-icon> mdi-check</v-icon>
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        </v-card-actions>
                    </div>
                    <div v-else>
                        <v-card-subtitle>
                            生年月日が未登録です
                        </v-card-subtitle>
                        <v-card-actions>
                        <v-btn
                            @click="dialog = true"
                        >
                            登録
                        </v-btn>
                        <v-dialog
                            v-model="dialog"
                            persistent
                            >
                            <v-card>
                                <v-card-title>
                                <span class="headline">生年月日</span>
                                </v-card-title>
                                <v-card-text>
                                <v-container>
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
                                    </v-row>
                                </v-container>
                            
                                </v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    icon
                                    dialog = "false"
                                    @click='registerBirthdate'
                                >
                                    <v-icon> mdi-check</v-icon>
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        </v-card-actions>
                    </div>
                </v-row>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
import axios from '@/api/index'
// import { mapState } from 'vuex'
const year_start = 1930
const year_end = 2030
const ageRange = new Array(year_end - year_start + 1).fill(null).map((_, i) => i + year_start)
const month_start = 1
const month_end = 12
const monthRange = new Array(month_end - month_start + 1).fill(null).map((_, i) => i + month_start)
const daysRange = [...Array(31)].map((_, i) => i)


export default {
    data: () => ({

      profile:{
          birthdate : '',
          avatar : '',
          name: null
      },
      year: '',
      yearrange: ageRange,
      month: '',
      monthrange: monthRange,
      day: '',
      daysrange: daysRange,
      dialog: false,
      dialog_avatar: false,
      comment: '卒業まであとわずか．\n２月にイタリアへの卒業旅行，ちゃんと行けるかなー',
      post: {},
      uploadedImage: '',
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
            this.profile.name = response.data.name, 
            this.profile.avatar = response.data.avatar_url, 
            this.profile.birthdate = response.data.birthdate,
            console.log(this.profile)
    )
    );
  },
  methods: {
      registerBirthdate(){
        // var date = new Date(this.year, this.month - 1, this.day)
        // this.profile.birthdate = date.getTime() / 1000
        axios()
        .put('/update_birthdate/',
        {
            id: localStorage.getItem('id'),
            year: this.year,
            month: this.month,
            day: this.day
        },
        {
            headers: {
                'access-token': localStorage.getItem('access-token'),
                uid: localStorage.getItem('uid'),
                client: localStorage.getItem('client'),
            },
        },
        )
        .then(response => (
            console.log(response),
            this.$router.go({path: this.$router.currentRoute.path, force: true})
        ))
      },
    onFileChange(e) {
        e.preventDefault();
        let files = e.target.files;
        this.uploadedImage = files[0];
        this.profile.avatar = this.uploadedImage
        console.log(files)
        console.log(this.uploadedImage)
     },
    postItem() {
        let formData = new FormData();
        formData.append('avatar', this.uploadedImage);
        formData.append('id', localStorage.getItem('id'));
        console.log(formData)
        axios().
        put('/update_avatar',
        formData,
        {
            headers: {
                'access-token': localStorage.getItem('access-token'),
                uid: localStorage.getItem('uid'),
                client: localStorage.getItem('client'),
            },
        },
        ).then(response => {
          this.uploadedImage = ''
          this.$refs.file.value = ''
          this.profile.avatar = response.data.avatar,
          console.log(response) ,
          this.$router.go({path: this.$router.currentRoute.path, force: true})
        }).catch(e => {
          console.log(e)
        })
      }
    }
}
</script>

<style>
  .top {
    background-image: url("~@/assets/back/sakura.jpg");
    /* max-width:100%; */
  }
</style>