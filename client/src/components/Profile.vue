<template>
<div>
    <div class="popup" v-if="popup">
        <div class="popup-content">
          <div class="flow">
            <clipper-fixed :src="src" ref="clipper" class="clipper-fixed" :round="false"></clipper-fixed>
            <div class="flex-center">
                <button class="btn g" @click="confirm">confirm</button>
                <button class="btn r" @click="cancel">cancel</button>
            </div>
          </div>
          <img src="../assets/cancel.png" alt="" class="close" @click="cancel">
        </div>
    </div>
    <div class="list-content content">
        <div class="area">
            <h3 class="tc">Last opp et bilde</h3>
            <div class="flex center">
                <div class="pic-con">
                    <img :src="clipResult">
                    <clipper-upload class="upload" v-model="src" @input="open"><span>upload image</span></clipper-upload>
                    <div v-if="!done" class="flex-center cen">
                      <loader>Converting</loader>
                    </div>
                </div>
              <div class="pic-con2">
                <img :src="clipResult">
              </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import clipToURL from '../clip.js'
import Loader from '@/components/Loader.vue'
import { clipperUpload, clipperFixed } from 'vuejs-clipper'

export default {
  name: 'Profile',
  components: {
    Loader,
    clipperUpload,
    clipperFixed
  },
  extends: {
    mixins: [clipToURL]
  },
  data: () => {
    return {
      popup: false,
      clipResult: require('../assets/avatar-5.jpg'),
      src: '',
      link: '',
      done: true
    }
  },
  methods: {
    open: function () {
      this.popup = true
    },
    close: function () {
      this.popup = false
    },
    confirm: function () {
      this.done = false
      this.clipResult = null
      this.clipToURL()
      this.close()
    },
    cancel: function () {
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  justify-content: center;
}
.cen{
  pointer-events: none;
  align-items: center;
  background-color: rgba(255,255,255,0.8);
}
.tc {
  text-align: center;
}
.mt {
  margin-top: 8px;
}
.edit-area {
  text-align: left;
}
.edit-area > div {
  word-wrap: nowrap;
  display: flex;
}
.edit-area input {
  width: 150px;
  font-size: 16px;
  border: 1px solid gray;
  border-radius: 3px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  flex-grow: 1;
}
input[type="textarea"] {
  height: 200px;
}
.pic-con {
  flex-basis: 250px;
  height: 250px;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0px 20px 20px 0px;
  overflow: hidden;
  position: relative;
  border-radius: 0%;
  & > * {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
.pic-con2 {
  flex-basis: 100px;
  height: 100px;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0px 0px 0px 0px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  & > * {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
.upload {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  color:rgba(150, 18, 155, 0.733);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.4s;
  &:hover {
    opacity: 1;
  }
}
.clipper-fixed {
  max-width: 400px;
  width: 80vw;
}
.popup {
  z-index: 10;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .popup-content {
    border: 1px solid lightgray;
    border-radius: 5px;
    box-sizing: content-box;
    padding: 10px;
    background-color: white;
    position: relative;
  }
  & .flow {
    max-width: 80vw;
    max-height: 90vh;
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  & .img {
    width: 100%;
    height: auto;
    display: block;
  }
  & .close{
    position: absolute;
    width: 30px;
    height:30px;
    top: -15px;
    right: -15px;
    display: block;
    z-index: 20;
    cursor: pointer;
  }
}
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.flex-center {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & div {
    flex-basis: 0;
    flex-grow: 1;
  }
}
.all-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and(max-width:596px) {
  .flex-center {
    & div {
      flex-basis: 100%;
    }
  }
  .label {
    flex-grow: 1;
    flex-basis: 100%;
  }
}
.range {
  display: inline-block;
  width: 100%;
  max-width: 350px;
}
.label {
  font-weight: bold;
}
.btn {
  margin: 5px;
  border-radius: 3px;
  padding: 6px;
  color: white;
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-weight: normal;
  background-color: gray;
  display: inline-block;
  transition: opacity 0.6s;
  font-size: 1.1rem;
  &:hover {
    opacity: 0.8;
  }
  &.g {
    background-color: #76e02f;
  }
  &.b {
    background-color: lightblue;
  }
  &.r {
    background-color: red;
  }
}
.btn-block {
  width: 100%;
}
.content {
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
  max-width: 1200px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.icon {
  width: 1.4em;
  vertical-align: bottom;
}
.area {
  margin-bottom: 30px;
  font-size: 1.1rem;
  & p {
    margin-bottom: 15px;
  }
  & .title {
    font-size: 1.1em;
  }
}
@media only screen and (max-width: 596px) {
  .area{
    font-size: 1rem;
  }
}
</style>
