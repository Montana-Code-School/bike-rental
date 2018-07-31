<template>

<body> connected to confirmation page
<p> {{this.$route.query.id}} </p>

</body>
</template>

<script>
export default {
  data () {
    return {
    }
  },
created () {
  console.log(this.$route.query.id)
}
}
</script>
