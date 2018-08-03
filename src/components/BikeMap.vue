
<template>
  <div>
    <!-- <h1>{{title}}</h1> -->
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>

export default {
  name: 'google-map',
  props: ['title'],
  watch: {
    title: () => {
      this.title = title
    }
  },
  data () {
    return {
      // default to Missoula
      // change this to whatever makes sense
      center: { lat: 46.8656618, lng: -113.97768149999999 },
      markers: [],
      places: [],
      currentPlace: null,
      title: null
    }
  },

  mounted () {
    this.geolocate()
    console.log("mounted", this.title)
    this.addMarker()
  },

  methods: {
    // receives a place object via the autocomplete component
    addMarker () {
      console.log(this.title)
      if (this.title) {
        const marker = {
          lat: Number(this.title.lat),
          lng: Number(this.title.lng)
        }
        this.markers.push({ position: marker })
        this.center = marker
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
