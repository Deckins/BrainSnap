<template>
  <div class="gallery">
    <div class="pic-grid container pb-5">
      <div @click="fullscreen(pn)" class="picbox" v-for="(pn, idx) in piclist" :key="idx">
        <img :src="geturl(pn)" />
      </div>
    </div>
    <div @click="fullpn = ''" v-if="fullpn !== ''" class="fullbox">
      <img @click="goInfo(fullpn)" :src="geturl(fullpn)" />
    </div>
    <div v-if="startSpin" class="spinner-container">
      <div class="text">LOADING</div>
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
      startSpin: false,
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
    },
    goInfo(uuid) {
      this.startSpin = true;
      this.axios.get(`/api/getexistingpicinfo?uuid=${encodeURIComponent(uuid)}`)
        .then(e => {
          this.$router.push({ name: 'Info', params: e.data })
        })
        .catch(e => console.log(e));
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

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes fadein {
    from { width:0;height:0;font-size:0; }
  }


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
      cursor: pointer;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .spinner-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.466);
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      animation: spin 3s linear infinite, fadein 0.5s;
      background-color: rgb(147, 147, 221);
    }
  }
}
</style>
