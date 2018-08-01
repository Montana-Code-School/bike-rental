<!-- <template>
  <map
    :center="center"
    :zoom="7"
  >
    <marker
      v-for="m in markers"
      :position.sync="m.position"
      :clickable="true"
      :draggable="true"
      @g-click="center=m.position"
    ></marker>
  </map>
</template>

<script>
  import {load, Map, Marker} from 'vue-google-maps'

  load('YOUR_API_TOKEN','OPTIONAL VERSION NUMBER')

  export default {
    data () {
      return {
        center: {lat: 10.0, lng: 10.0},
        markers: [{
          position: {lat: 10.0, lng: 10.0}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }]
      }
    }
  }
</script>  -->
