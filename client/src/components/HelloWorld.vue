<template>
<div class="container">
  <h1 v-if="!profile">Lyst til å være lærer hos oss?</h1>
  <h1 v-if="profile">Selvbetjening</h1>
  <div class="users">
    <button v-if="!profile" v-on:click="signIn">
      Bli med
    </button>
    <button v-if="profile" v-on:click="signOut">
      Logg ut
    </button>
    <p v-if="profile">
      Hei {{ profile.name }}. Her kan du
      <router-link :to="{ name: 'ShareThoughts' }">
        skrive kort om deg.
      </router-link>
    </p>
  </div>
  <p class="error" v-if="error"></p>

  <p v-if="profile">
    <clipper-upload class="my-button" v-model="imgURL2">upload image</clipper-upload>
    <button class="my-button" v-on:click="getResult">clip image</button>

    <clipper-fixed class="my-clipper" ref="clipper" :src="imgURL2" preview="my-preview" :ratio="1">
      <div class="placeholder" slot="placeholder">Ingen bilde</div>
    </clipper-fixed>

      <br/>DEBUG - preview
      <clipper-preview name="my-preview">
        <div class="placeholder" slot="placeholder">Forhåndsvisning</div>
      </clipper-preview>

      <br/>DEBUG - result
      <img class="result" :src="resultURL" alt="">
  </p>

  <br/>
  <div class="micro-posts-container">
    <div class="micro-post"
         v-for="(microPost, index) in microPosts"
         v-bind:item="microPost"
         v-bind:index="index"
         v-bind:key="microPost.id">

      <div class="created-at">
        {{ `${microPost.createdAt.getDate()}/${microPost.createdAt.getMonth() + 1}/${microPost.createdAt.getFullYear()}` }}
      </div>
      <p class="text">{{`${microPost.text}`}}</p>
      <p class="author">- {{ microPost.author ? microPost.author.name : 'Unknown' }}</p>
    </div>
  </div>
</div>
</template>

<script>
import auth0Client from '../AuthService'
import MicroPostService from '../MicroPostsService'
import { clipperUpload, clipperFixed } from 'vuejs-clipper'

export default {
  name: 'HelloWorld',
  data () {
    return {
      microPosts: [],
      error: '',
      profile: null,
      imgURL2: '',
      resultURL: ''
    }
  },
  async created () {
    try {
      this.microPosts = await MicroPostService.getMicroPosts()
      this.profile = auth0Client.getProfile()
    } catch (error) {
      this.error = error.message
    }
  },
  methods: {
    signIn: auth0Client.signIn,
    signOut: auth0Client.signOut,
    getResult: function () {
      const canvas = this.$refs.clipper.clip() // call component's clip method
      this.resultURL = canvas.toDataURL('image/jpeg', 1) // canvas->image
    }
  },
  components: {
    clipperUpload,
    clipperFixed
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.my-clipper {
  width: 100%;
  max-width: 800px;
}

.placeholder {
    width: 100%;
    /* max-width: 700px; */
    padding: 20px;
    background-color: lightgray;
}

.my-button {
  background-color: #f4511e;
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  font-size: 16px;
  margin: 4px 2px;
  opacity: 0.6;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}

.my-button:hover {opacity: 1}

div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.micro-post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

p.author {
  font-style: italic;
  margin-top: 5px;
}

</style>
