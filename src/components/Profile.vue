  <template lang="html">
    <b-card-group deck class="mb-3">
      <b-card
        v-for="share in shares"
        :key="share.id"
        :title="share.shortDescription"
      >
        <div>
          <p class="card-display">
            <img
              :src="(share.uploadedPicture ? 'data:image/png;base64,' + share.uploadedPicture : '')"
              height="100"/>
              <br/>
              <br/>
              {{share.bikeType}}
          </p>
          <p>
            {{share.longDescription}}
            <br/>
            <br/>
            Paid: ${{share.costToRent}}
            <br/>
            <br/>
            Rental dates:
          </p>
        </div>
      </b-card>
    </b-card-group>
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
  async created () {
    this.getSharesByRented()
  },
  methods: {
    async getSharesByRented () {
      this.shares = await api.getSharesByRented()
    }
  }
}
</script>

<style lang="css">
</style>
