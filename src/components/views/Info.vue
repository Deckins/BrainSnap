<template>
  <div class="info container mb-5">
    <div class="pic-container mb-5">
      <img class="pic" :src="`/api/${$route.params.name}`" />
    </div>
    <div class="food-card mb-2" v-for="(l, i) in descriptions" :key="i">
      <div class="title-row">
        <div class="title">{{ l }}</div>
        <div> {{true ? 'BRAIN FOOD' : ''}} </div>
      </div>
      <div>
        calories:
      </div>
      <div>
        calories:
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data () {
    return {
    }
  },
  computed: {
    descriptions() {
      return this.$route.params.value.labelAnnotations.map(l => l.description);
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  .pic-container {
    width: 100%;
    background-color: rgb(68, 65, 65);
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 300px;
    .pic {
      height: 100%;
      max-height: 300px;   
    }
  }

  .food-card {
    background-color: rgba(233, 161, 27, 0.8);
    border-radius: 5px;
    .title-row {
      margin: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .title {
        font-size: 25px;
        text-decoration: underline;
      }
    }
    .content {

    }
  }
}
</style>
