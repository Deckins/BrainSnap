<template>
  <div class="">
    <div v-for="(l, i) in descriptions" :key="i"> {{ l }} </div>
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
      return this.$route.params.labelAnnotations.map(l => l.description);
    }
  }
}
</script>

<style scoped>
</style>
