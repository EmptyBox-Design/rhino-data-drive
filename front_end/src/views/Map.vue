<template>
  <div class="map">

    <AddressLookup></AddressLookup>

    <MglMap :accessToken="accessToken" :mapStyle.sync="mapStyle" container="map-parent" @load="onMapLoaded" :zoom="zoom">
      <MglNavigationControl position="top-right" />
      <MglGeolocateControl position="top-right" />
    </MglMap>
    <sidebar />
  </div>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
// MAPBOX IMPORTS
import Mapbox from "mapbox-gl";
import { MglMap, MglNavigationControl, MglGeolocateControl, MglPopup, } from "vue-mapbox";
import AddressLookup from "../views/AddressLookup.vue";

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: { MglMap, MglNavigationControl, MglGeolocateControl, AddressLookup , sidebar},
  data(){
    return {
      accessToken:
      "pk.eyJ1IjoiZW1wdHlib3gtZGVzaWducyIsImEiOiJjanBtM3E3ajAwbDF0NDJsa2N0OWh4M3p0In0.ZhciPKsk9UUSjUN44kJrcw",
      mapStyle: "mapbox://styles/emptybox-designs/cjpq0tslf1asv2srjg6zdwf6k",
      stops: null,
      zoom: 1
    }
  },
  created(){
    this.mapbox = Mapbox;
  },
  computed:{
    ...mapGetters({
      address: 'getDatasetAddress',
    })
  },
  mounted(){
    this.modelInputSubscriber();
  },
  methods:{
    onMapLoaded(event){
      this.map = event.map
    },
    mapFlyTo(lng, lat){
      // needs to be assigned to local variable
      let mapCenter = [lng, lat]

      this.map.flyTo({
        center: mapCenter,
        zoom: 15,
        bearing: 0,
          speed: 1.2,
          curve: 1, 
          easing: function (t) { return t; }
        });
    },
    // fires whenever the address is updated in the $store
    modelInputSubscriber: function () {
      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case 'setData':
            console.log("firing the death star")
            break
        }
      })
    },
    // fires whenever the address is updated in the $store
    modelInputSubscriber: function () {
      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case 'setDatasetAddress':
            let lat = parseFloat(this.address[0].lat)
            let lng = parseFloat(this.address[0].lon)
            this.mapFlyTo(lng, lat)
            break
        }
      })
    }
  }
}
</script>

<style lang="scss">
#map{
  width: 100vw;
}
#map-parent{
  position: absolute;
  height: calc(100vh - #{$navbar-height});

  left: 0;
  top: 0;

  overflow: hidden;
}

</style>
