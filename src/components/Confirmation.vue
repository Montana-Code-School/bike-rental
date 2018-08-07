<template>
  <div>
    <h3 class="my-3">You're Almost There</h3>
    <b-card>
      <h1>{{this.share.shortDescription}}</h1>
        <img
          :src="(share.uploadedPicture ? 'data:image/png;base64,' + share.uploadedPicture : '')"
          height="100"
        />
        <p class="my-4">{{this.share.longDescription}}</p>
      <h5>Cost: ${{this.share.costToRent}}</h5>
      <h5>Pick up location: {{this.share.address}} {{this.share.city}}, MT</h5>
        <div id="google-map">
          <bike-map :title="this.share"/>
        </div>
    </b-card>
  </div>
</template>

<script>
import api from '@/api'
import BikeMap from '@/components/BikeMap'
export default {
  name: 'App',
  data () {
    return {
      share: []
    }
  },
  components: {
    BikeMap
  },
  async created () {
    this.getBackShare()
  },
  methods: {
    async getBackShare (id) {
      this.share = await api.getShare(this.$route.query.id)
    }
  }
}
</script>
