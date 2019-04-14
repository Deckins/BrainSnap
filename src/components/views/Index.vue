<template>
  <div class="index">
    <div>
      <img class="logo mb-5" src="~@/assets/logo.png">
    </div>
    
    <div class="mb-5">
      <input id="picbucket"
        accept="image/*"
        capture="camera"
        type="file" class="d-none" name="file" @change="onFileChange($event)">
      <label for="picbucket" class="brain-btn mb-5">
        Upload Image
      </label>
      <router-link tag="div" class="brain-btn mb-5" to="/gallery">Gallery</router-link>
    </div>
    <div v-if="startSpin" class="spinner-container">
      <div class="text">LOADING</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      startSpin: false,
    }
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        console.log('no files');
        return
      }

      const file = new Blob([files[0]]); // kind of works and choses stream as content type of file (not request)

      const formData = new FormData();
      formData.append('imageupload', file, file.filename);
      this.startSpin = true;
      this.axios.post('/api/postpic', formData, {})
        .then(e => {
          console.log('a', e)
          this.$router.push({ name: 'Info', params: e.data })
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes fadein {
    from { width:0;height:0;font-size:0; }
  }

  .logo {
    // max-width: 500px;
    // filter: grayscale(100%) drop-shadow(3px 3px 3px gray);
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
