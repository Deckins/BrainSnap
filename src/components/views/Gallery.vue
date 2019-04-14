<template>
  <div class="gallery">
    <div class="pic-grid container">
      <img v-for="i in 100" :key="i" src="https://i.imgur.com/A9s5vWS.png"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .pic-grid {
    
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    img {
      object-fit: cover;
      width: 100%;
      max-height: 100%;
    }
  }
}
</style>
