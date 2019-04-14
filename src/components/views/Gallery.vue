<template>
  <div class="gallery">
    <div class="pic-grid container pb-5">
      <div @click="fullscreen(pn)" class="picbox" v-for="(pn, idx) in piclist" :key="idx">
        <img :src="geturl(pn)" />
      </div>
    </div>
    <div @click="fullpn = ''" v-if="fullpn !== ''" class="fullbox">
      <img :src="geturl(fullpn)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data () {
    return {
      piclist: [],
      fullpn: '',
    }
  },
  mounted() {
    this.axios.get('/api/getpics').then(r => {
      this.piclist = r.data
    })
  },
  methods: {
    geturl(pn) {
      if (pn && pn !== '') {
        return `/api/img/${pn}`
      }
    },
    fullscreen(pn) {
      this.fullpn = pn;
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  user-select: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .pic-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    .picbox {
      cursor: pointer;
      background-color: rgb(68, 65, 65);
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
      }
    }
  }

  .fullbox {
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(19, 15, 15, 0.705);
    img {
        max-width: 100%;
        max-height: 100%;
    }
  }
}
</style>
