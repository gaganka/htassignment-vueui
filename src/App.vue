<template>
  <div class="container">
    <!-- <img alt="Vue logo" src="./assets/logo.png" width="40"> -->
    <Vendor msg="Vending Machine Simulator"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Vendor from './components/Vendor.vue';

@Component({
  components: {
    Vendor,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
