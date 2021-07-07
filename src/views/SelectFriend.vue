<template>
 
  <v-container fluid fill-height>
    <v-card
      width="400px"
      height='100%'
    >
      <v-list dense>
        
        <v-subheader class='text-h5'>送信相手</v-subheader>
        <v-divider/>
        <v-list-item-group
          color="primary"
          
        >
          <v-list-item
            v-for="(item, i) in frineds"
            :key="i"
          >
              <v-list-item-icon>
                  <v-avatar size="30">
                      <img
                        :src="railsURL + item.avatar_url"
                      >
                  </v-avatar>
                </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class='text-h8'> {{item.name}}</v-list-item-title>
              </v-list-item-content> 
              <v-list-item-action>
                <v-btn @click='selectFrined(item)' icon>
                  <v-icon>
                    mdi-arrow-right-bold
                  </v-icon>
                </v-btn>
              </v-list-item-action>
          </v-list-item>
          <v-divider/>
        </v-list-item-group>
      </v-list>
    </v-card>
      <v-card
          v-if="select.name"
          class="mx-auto"
          max-width="400"
          max-height="100%"
      >
        <v-img
        v-bind:src="railsURL + select.avatar_url"
        height="100%"
        width="100%"
        >
        
        </v-img>
        <v-card-title>
          {{select.name}}
        </v-card-title>
        <v-row>
            <v-card-subtitle>
                {{select.birthdate}}
            </v-card-subtitle>
        </v-row>
        <v-container>
        <v-btn icon x-large @click='editMessage'>
          <v-icon x-large>
            mdi-email
          </v-icon>
        </v-btn>
      </v-container>
      </v-card>
  </v-container>
</template>

<script>
import axios from '@/api/index'

export default {
    data: () => ({
        frineds: {},
        dialog: false,
        select: {
          'name': null,
          'avatar': null,
          'birthdate': null
        },
        railsURL: "http://localhost:3000",
    }),
    async mounted() {
    await axios()
      .get('/family/' + localStorage.getItem('id'),
      {
        headers: {
           'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client'),
        },
      },
      )
      .then(response => (
            console.log(response.data),
            this.frineds = response.data
    )
    );
    
  },
    methods: {
      editMessage() {
        console.log(this.select),
        this.$router.push({name: 'SendMessage', params: {to_id: this.select.id}})
      },
      selectFrined(frined) {
        this.select = frined
      }
      
    },
}
</script>