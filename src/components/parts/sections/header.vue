<template>
  <p>*HEADER222*</p>
</template>
<script>
export default {
  name: 'Header',
  beforeCreate () {
    // console.log(222222222222222)
  },
  mounted () {
    console.log(this.$store.state.global.test_param)
  }
}
</script>
