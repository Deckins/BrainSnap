<template>
  <div class="info container mb-5">
    <div class="pic-container mb-5">
      <img class="pic" :src="`/api/${$route.params.name}`" />
    </div>
    <div class="food-card mb-2" v-for="(p, i) in lst" :key="i">
      <div class="title-row">
        <div class="title">{{ p.name }}</div>
        <div> {{true ? 'BRAIN FOOD' : ''}} </div>
      </div>
      <div class="nutrient mx-auto pb-3">
        <div class="nutrient-pair" v-for="([a,b],idx) in Object.entries(p.value.food.nutrients)"
          :key="idx">
          <div>{{a}}</div>
          <div>{{b}}</div>
        </div>
      </div>
    </div>
    <div v-if="lst.length === 0" class="food-card food-not-found mb-2">
      This does not appear to be edible
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data () {
    return {
      lst: []
    }
  },
  computed: {
    descriptions() {
      return this.$route.params.value &&
        this.$route.params.value.labelAnnotations.map(l => l.description)
        || [];
    }
  },
  methods: {
    readInfo(l) {
      return this.infoMap[l]
    }
  },
  mounted() {
    this.descriptions.forEach(d => {
      this.axios.get(`/api/getfoodinfo?label=${encodeURIComponent(d)}`)
        .then(x => {
          let searched = x.data.hints.find(x => x.food.label.toUpperCase() === d.toUpperCase())
          if (searched) {
            this.lst.push({
              name: d,
              value: searched,
            })
          }
        })
    });
  },
  watch: {
    infoMap: {
      handler: function(val, oldVal) {
        this.showMap();
      },
      deep: true
    }
  },
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
    &.food-not-found {
      font-size: 25px;
    }
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
    .nutrient {
      width: 100%;
      max-width: 500px;
      .nutrient-pair {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
