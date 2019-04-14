<template>
  <div class="gallery">
    <div class="pic-grid container">
      <div class="picbox" v-for="(pn, idx) in piclist" :key="idx">
        <img :src="geturl(pn)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data () {
    return {
      piclist: [],
    }
  },
  mounted() {
    this.axios.get('http://localhost:3000/getpics').then(r => {
      this.piclist = r.data
    })
  },
  methods: {
    geturl(pn) {
      return `http://localhost:3000/img/${pn}`
    },
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

    .picbox {
      background-color: rgb(68, 65, 65);
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
      }
    }
  }
}
</style>
