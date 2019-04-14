<template>
  <div id="app" class="pt-5">
    <div class="banner" :class="$route.path !== '/' ? 'pb-3' : ''">
      <div class="title">
        App Name
      </div>
      <div v-if="$route.path !== '/'" class="mt-2">
        <router-link tag="div" to="/" class="mx-auto back-btn">Back</router-link>
      </div>
    </div>
    <router-view class="mt-5"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css);
body {
padding: 0;
margin: 0;

  background-image: linear-gradient( rgba(73,188,171, 0.95), rgba(73,188,171, 0.95) ),
    url('~@/assets/bg.png');
  // background-repeat:no-repeat;
  background-position: center center;
  background-size: cover;

  
}
html {
  padding: 0;
  margin: 0;
  height: 100%;

  overflow-x: hidden;
  overflow-y: auto;
}

@font-face {
  font-family: 'Folks-Bold'; /*a name to be used later*/
  src: url('~@/assets/Folks-Bold.ttf'); /*URL to font*/
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  font-family: 'Folks-Bold';

  .banner {
    position: sticky;
    top: 0;
    background-color: orange;

    .title {
      font-size: 40px;
      font-weight: 600;

    }

    .back-btn {
      font-weight: 600;
      font-size: 14px;
      padding: 4px 0;
      color: #fff;
      background-color: #41586e;
      border-radius: 20px;
      width: 100px;
      margin: 0 0;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;

      &:hover {
        background-color: #2c3e50;
      }
    }
  }

}
</style>
