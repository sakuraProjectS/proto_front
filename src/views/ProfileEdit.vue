<template>
    <v-container fluid fill-height class='bg'>
        <v-row class='mt-3 ml-3'>
            <p class="text-h6"> プロフィール編集</p>
        </v-row>
        <v-row class='ml-1'>
            <v-btn icon @click='returnPage'>
                <v-icon>
                    mdi-arrow-left-thick
                </v-icon>
            </v-btn>
        </v-row>
        <v-layout wrap class='justify-center'>
            <v-flex xs12 sm9 md6>
                <v-divider class='mt-5'/>
                <v-row v-if='avatar' justify="center" class='mt-10 mb-15'>
                    <v-btn
                        icon
                        @click="dialog_avatar = true"
                    >
                        <v-avatar size='100'>
                            <v-img
                            v-bind:src="railsURL + avatar"
                            >
                            </v-img>
                        </v-avatar>
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
                </v-row>
                <v-row v-else justify="center" class='mt-10 mb-15'>
                    <v-btn
                        icon
                        @click="dialog_avatar = true"
                    >
                        <v-avatar size='100'>
                            <v-img
                            src="@/assets/icon/kame.jpg"
                            >
                            </v-img>
                        </v-avatar>
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
                                            <v-row>
                                                <v-col cols="9">
                                                    <v-list-item-subtitle>
                                                        {{item}}
                                                    </v-list-item-subtitle>
                                                </v-col>
                                                <v-col>  
                                                    <div v-if='index === 0'>                                              
                                                        <v-btn icon @click='dialog_0 = true'>
                                                            <v-icon>
                                                                mdi-pen
                                                            </v-icon>
                                                        </v-btn>
                                                    </div>

                                                    <div v-if='index === 1'>                                              
                                                        <v-btn icon @click='dialog_1 = true'>
                                                            <v-icon>
                                                                mdi-pen
                                                            </v-icon>
                                                        </v-btn>
                                                    </div>
                                                </v-col>
                                            </v-row>
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

            <v-dialog
                v-model="dialog_1"
                persistent
                max-width="500"
            >
                <v-card rounded="xl">
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
                        @click="dialog_1 = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        icon
                        dialog_1 = "false"
                        @click='registerBirthdate'
                    >
                        <v-icon> mdi-check</v-icon>
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog
                v-model="dialog_0"
                persistent
                max-width="500"
            >
            <v-card rounded="xl"> 
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
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog_0 = false"
                >
                    Close
                </v-btn>
                <v-btn
                    icon
                    dialog_0 = "false"
                    @click='changeName'
                >
                    <v-icon> mdi-check</v-icon>
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from '@/api/index'
import { mapState } from 'vuex'
const year_start = 1950
const year_end = 2030
const ageRange = new Array(year_end - year_start + 1).fill(null).map((_, i) => i + year_start)
const month_start = 1
const month_end = 12
const monthRange = new Array(month_end - month_start + 1).fill(null).map((_, i) => i + month_start)
const daysRange = [...Array(31)].map((_, i) => i)


export default {
    data: () => ({
        year: '',
        yearrange: ageRange,
        month: '',
        monthrange: monthRange,
        day: '',
        daysrange: daysRange,
        dialog_0: false,
        dialog_1: false,
        dialog_avatar: false,
        uploadedImage: '',
        items: {},
        avatar : '',
        lastname: '',
        firstname: '',
    }),

    async mounted() {
    await axios()
      .get('/profile/' + this.user_info["id"],
      {
        headers: this.user_info
      },
      )
      .then(response => ( 
            this.avatar = response.data.avatar_url, 
            this.items['Name'] = response.data.name,
            this.items['Date of birth'] = response.data.birthdate,
            this.items['E-mail'] = response.data.email
    )
    );
  },
    methods: {
        registerBirthdate(){
            axios()
            .put('/update_birthdate/',
            {
                id: localStorage.getItem('id'),
                year: this.year,
                month: this.month,
                day: this.day
            },
            {
                headers: this.user_info
            },
            )
            .then(response => (
                console.log(response),
                // this.$router.go({path: this.$router.currentRoute.path, force: true})
                this.$router.push({name: 'Profile'})  
            ))
        },
        changeName(){
            this.name =this.lastname + " " +this.firstname
            axios()
            .put('/users/' + this.user_info["id"],
            {
                name: this.name
            },
            {
                headers: this.user_info
            },
            )
            .then(response => (
                console.log(response),
                this.$router.push({name: 'Profile'})  
            ))
        },
        onFileChange(e) {
            e.preventDefault();
            let files = e.target.files;
            this.uploadedImage = files[0];
            this.profile.avatar = this.uploadedImage
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
                headers: this.user_info
            },
            ).then(response => {
            this.uploadedImage = ''
            this.$refs.file.value = ''
            this.avatar = response.data.avatar,
            //   this.$router.go({path: this.$router.currentRoute.path, force: true})
                this.$router.push({name: 'Profile'})  
            }).catch(e => {
            console.log(e)
            })
        },
        returnPage(){
        this.$router.push({name: 'Profile'})
        }
    },

    computed: {
        ...mapState(["user_info", "railsURL"]),
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