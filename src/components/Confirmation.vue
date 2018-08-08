<template>
<div>
  <b-card-group deck class="mb-3">
  <b-card>
    <div>
      <b-img
        :src="(share.uploadedPicture ? 'data:image/png;base64,' + share.uploadedPicture : '')"
        fluid
        fluid alt="bike image"
      />
    </div>
    <p class="card-text">
      <b-list-group flush>
      <b-list-group-item>A little deets about this Zootown bicycle: {{this.share.shortDescription}}</b-list-group-item>
      <b-list-group-item>A lotta deets about this Zootown bicycle: {{this.share.longDescription}}</b-list-group-item>
      <b-list-group-item>Price: ${{this.share.costToRent}}</b-list-group-item>
      <b-list-group-item>Pick up location: {{this.share.address}} {{this.share.city}}, MT
        <div id="google-map">
          <bike-map :title="this.share"/>
        </div>
      </b-list-group-item>
      </b-list-group>
    </p>
  </b-card>
  <b-card
    bg-variant="info"
    text-variant="white"
    class="text-center"
  >
  <div>
    <h1>
      your adventure awaits
    </h1>
    <br>
    <img src="../assets/adventure.jpg" alt="Zootown Bike Share" height="500" width="700">
  </div>
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
  .card-deck {
    display: flex;
    margin-right: 15px;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 15px
  }
</style>
