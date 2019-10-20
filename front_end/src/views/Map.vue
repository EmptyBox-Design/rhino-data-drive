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
import proj4 from "proj4";
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

    var fromProjection = 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'
    var toProjection = 'PROJCS["WGS 84 / Pseudo-Mercator",GEOGCS["Popular Visualisation CRS",DATUM["Popular_Visualisation_Datum",SPHEROID["Popular Visualisation Sphere",6378137,0,AUTHORITY["EPSG","7059"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6055"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4055"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Mercator_1SP"],PARAMETER["central_meridian",0],PARAMETER["scale_factor",1],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","3785"],AXIS["X",EAST],AXIS["Y",NORTH]]'

    var coordinates = [-74.39485838, 43.595969]
    var projected = proj4(fromProjection, toProjection, coordinates)
    console.log(projected)
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
          case 'settDatasetAddress':
            console.log(this.address)
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
