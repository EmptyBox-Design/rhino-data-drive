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
  mounted(){
  },
  methods:{
    onMapLoaded(event){
      this.map = event.map
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
