<template>
  <div class="app">
    <h1>test this word</h1>
    <img src="./assets/logo.png">
    <!--下面是別的template-->
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'Apptt',
  components: {
    HelloWorld,
  },
};
</script>

<style>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
