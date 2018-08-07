  <template lang="html">
    
    <b-btn
      type="submit"
      @click="getSharesByRented"
      variant="success">Find Your Bike
    </b-btn>
  </template>

  <script>
  import api from '@/api'
  export default {
    data () {
      return {
        shares: [],
        model: {}
      }
    },
    methods: {
      async getSharesByRented () {
        console.log('front end')
        console.log(this.model)
        this.shares = await api.getSharesByRented(this.shares)
      }
    }
  }
  </script>

  <style lang="css">
  </style>
