<template>
  <div class="index">
    <div>
      <img v-for="i in 20" :key="i" class="logo mb-5 position-absolute" :style="`animation-delay: ${i/10}s;`" src="@/assets/logo.png">
      <img class="logo mb-5 position-absolute" :style="`animation-delay: 99999999999s;`" src="@/assets/logo.png">
    </div>
    
    <div class="mb-5">
      <router-link tag="div" class="brain-btn mb-5" to="/Info">Start</router-link>
      <router-link tag="div" class="brain-btn mb-5" to="/gallery">Gallery</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(360deg);}
  }

  .logo {
    animation: spin 1s infinite linear;
    filter: grayscale(100%) drop-shadow(3px 3px 3px gray);
  }

  .brain-btn {
    font-weight: 600;
    font-size: 20px;
    padding: 10px 30px;
    color: #fff;
    background-color: rgb(247,181,57);
    border-radius: 20px;
    width: 200px;
    margin: 0 0;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;

    &:hover {
      background-color: rgb(233, 161, 27);
      filter: drop-shadow(3px 3px 3px gray);
    }
  }
}
</style>
