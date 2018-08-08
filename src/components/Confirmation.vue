<template>
<div>
  <b-card-group deck class="mb-3">
  <b-card title="now you're ready to roll">
    <div>
      <b-img
        :src="(share.uploadedPicture ? 'data:image/png;base64,' + share.uploadedPicture : '')"
        fluid alt="bike image"
      />
    </div>
    <p class="card-text">
      <b-list-group flush>
      <b-list-group-item>Short{{this.share.shortDescription}}</b-list-group-item>
      <b-list-group-item>Long{{this.share.longDescription}}</b-list-group-item>
      <b-list-group-item>${{this.share.costToRent}}</b-list-group-item>
      <b-list-group-item>Pick up location: {{this.share.address}} {{this.share.city}}, MT
        <div id="google-map">
          <bike-map :title="this.share"/>
        </div>
      </b-list-group-item>
      </b-list-group>
    </p>
  </b-card>
  <b-card
    bg-variant="success"
    text-variant="white"
    class="text-center"
  >
  <h1>your adventure awaits</h1>
  <img src="../assets/adventure.jpg" alt="Zootown Bike Share" height="400" width="500">
  </b-card>
  </b-card-group>
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

<style>
  .card-display {
    align-items: center;
    justify-content: center;
  }
  img.card-img-top {
    height: 150;
  }
</style>
