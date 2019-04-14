<template>
  <div class="info container mb-5">
    <div class="pic-container mb-5">
      <img class="pic" :src="`/api/${$route.params.name}`" />
    </div>
    <div class="food-card mb-2" :class="isBrain(p.name) ? 'brain' : ''" v-for="(p, i) in lst" :key="i">
      <div class="title-row">
        <div class="title">{{ p.name }}</div>
        <div> {{isBrain(p.name) ? 'BRAIN FOOD' : ''}} </div>
      </div>
      <div class="nutrient mx-auto pb-3">
        <div class="nutrient-pair" v-for="([a,b],idx) in Object.entries(p.value.food.nutrients)"
          :key="idx">
          <div>{{toReadable(a)}}</div>
          <div>{{b.toFixed(2)}}</div>
        </div>
      </div>
      <div class="container mb-3" v-if="isBrain(p.name)"> {{brainfood.find(f => f.id.toUpperCase() === p.name.toUpperCase()).description}} </div>
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
      lst: [],
      brainfood: [
        {
          "id": "Fatty Fish",
          "description": "About 60% of your brain is made of fat, and half of that fat is the omega-3 kind. Your brain uses omega-3s to build brain and nerve cells, and these fats are essential for learning and memory. Omega 3-s also have a couple additional benefits for your brain. For one thing, they may slow age-related mental decline and help ward off Alzheimer's disease. On the flip side, not getting enough omega-3s is linked to learning impairments, as well as depression. In general, eating fish seems to have positive health benefits. One study found that people who ate baked or broiled fish regularly had more gray matter in their brains. Gray matter contains most of the nerve cells that control decision making, memory and emotion."
        },
        {
          "id": "Broccoli",
          "description": "Broccoli is packed with powerful plant compounds, including antioxidants. It's also very high in vitamin K, delivering more than 100% of the Recommended Daily Intake (RDI) in a 1-cup (91-gram) serving. This fat-soluble vitamin is essential for forming sphingolipids, a type of fat that's densely packed into brain cells. A few studies in older adults have linked a higher vitamin K intake to better memory. Beyond vitamin K, broccoli contains a number of compounds that give it anti-inflammatory and antioxidant effects, which may help protect the brain against damage."
        },
        {
          "id": "Pumpkin Seed",
          "description": "May help enhance memory and boost mood. Richer in zinc than many other seeds, pumpkin seeds supply this valuable mineral which is vital for enhancing memory and thinking skills. These little seeds are also full of stress-busting magnesium, B vitamins and tryptophan, the precursor to the good mood chemical serotonin."
        }
      ],
      acryonymMap: {
        'CA': 'Calcium',
        'ENERC_KCAL':	'Calories',
        'CHOCDF':	'Carbs',
        'NIA':	'Niacin (B3)',
        'CHOLE':	'Cholesterol',
        'P':	'Phosphorus',
        'FAMS':	'Monounsaturated',
        'PROCNT':	'Protein',
        'FAPU':	'Polyunsaturated',
        'RIBF':	'Riboflavin (B2)',
        'FASAT':	'Saturated',
        'SUGAR':	'Sugars',
        'FAT':	'Fat',
        'THIA':	'Thiamin (B1)',
        'FATRN':	'Trans',
        'TOCPHA':	'Vitamin E',
        'FE':	'Iron',
        'VITA_RAE':	'Vitamin A',
        'FIBTG':	'Fiber',
        'VITB12':	'Vitamin B12',
        'FOLDFE':	'Folate (Equivalent)',
        'VITB6A':	'Vitamin B6',
        'K':	'Potassium',
        'VITC':	'Vitamin C',
        'MG':	'Magnesium',
        'VITD':	'Vitamin D',
        'NA':	'Sodium',
        'VITK1':	'Vitamin K',
      }
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
    toReadable(s) {
      return this.acryonymMap[s] || s
    },
    isBrain(str) {
      let found = this.brainfood.find(f => f.id.toUpperCase() === str.toUpperCase())
      return !(found == null)
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
}
</script>

<style lang="scss" scoped>
.info {
  .pic-container {
    // width: 100%;
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
    border: 2px solid white;
    background-color: rgb(233, 161, 27);
    border-radius: 5px;
    &.brain {
      background-color: rgb(233, 127, 27);
    }
    &.food-not-found {
      font-size: 25px;
      background-color: rgb(238, 105, 105);
      color: white;
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
