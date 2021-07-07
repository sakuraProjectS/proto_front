<template>
    <v-container>
        <v-card>
        <v-list>
            <template  v-for="(message, index) in messages">
            <v-list-item
                :key="index"
                 @click='showMessage(message)'
            >
                <v-list-item-content>
                    <v-list-item-title>
                        {{ message.from }}さんからメッセージが届いています
                    </v-list-item-title>
                </v-list-item-content>
        
                <v-list-item-action>    
                    <v-btn @click="deleteMessage(message)" icon>
                            <v-icon>
                            mdi-delete
                        </v-icon>   
                    </v-btn>
                </v-list-item-action>
                
            </v-list-item>
            <v-divider
                  v-if="index + 1 < messages.length" 
                  :key="`divider-${index}`"
                >
                </v-divider>
            </template>
        </v-list>
        </v-card>
    </v-container>    
</template>

<script>
import axios from '@/api/index'

  export default {
    data: () => ({
      search:'',
      messages: {},
      recieved: {},
    }),

    mounted() {
    axios()
      .get('/searches',
       {
        headers: {
           'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client'),
          },
       }
      )
      .then(response => (
          
          this.messages = response.data
          ))
        
    },
  
 
    methods: {
        deleteMessage(message) {
            axios().delete(`/messages/${message.id}`,
            {
                headers: {
                'access-token': localStorage.getItem('access-token'),
                uid: localStorage.getItem('uid'),
                client: localStorage.getItem('client'),
                },
            }
            )
        },
        showMessage(message) {
            this.$router.push({name: 'Message', params: {content: message}})
        }
    },
  }
</script>