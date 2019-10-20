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
            let lat = parseFloat(this.address.coordinates.y)
            let lng = parseFloat(this.address.coordinates.x)
            this.mapFlyTo(lng, lat)
            break
        }
      })
    },
    addFillLayer: function() {
      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case 'setDatasetBlockGroups':
            let json = parseFloat(this)
            console.log(json);
            this.map.addLayer({
              'id': 'maine',
              'type': 'fill',
              'source': {
                'type': 'geojson',
                'data': {
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Polygon',
                    'coordinates': [[[-67.13734351262877, 45.137451890638886],
                    [-66.96466, 44.8097],
                    [-68.03252, 44.3252],
                    [-69.06, 43.98],
                    [-70.11617, 43.68405],
                    [-70.64573401557249, 43.090083319667144],
                    [-70.75102474636725, 43.08003225358635],
                    [-70.79761105007827, 43.21973948828747],
                    [-70.98176001655037, 43.36789581966826],
                    [-70.94416541205806, 43.46633942318431],
                    [-71.08482, 45.3052400000002],
                    [-70.6600225491012, 45.46022288673396],
                    [-70.30495378282376, 45.914794623389355],
                    [-70.00014034695016, 46.69317088478567],
                    [-69.23708614772835, 47.44777598732787],
                    [-68.90478084987546, 47.184794623394396],
                    [-68.23430497910454, 47.35462921812177],
                    [-67.79035274928509, 47.066248887716995],
                    [-67.79141211614706, 45.702585354182816],
                    [-67.13734351262877, 45.137451890638886]]]
                  }
                }
              }
          })
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
  // height: calc(100vh - #{$navbar-height});
  height: 100vh;

  left: 0;
  top: 0;

  overflow: hidden;
}

</style>
