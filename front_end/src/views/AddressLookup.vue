<template>
  <div v-if="show" class="row justify-content-center position-absolute w-100 h-100 m-0">
    <div id="addressLookup" class="col-6 align-self-center text-dark bg-light text-center rounded p-4">
      <b-form @submit="onSubmit" @reset="onReset">
        <h3>Type in an address to study!</h3>
        <b-form-group
          id="input-group-1"
          label=""
          label-for="input-1"
          description="We'll never share your address with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.address"
            required
            placeholder="Enter address"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "address-lookup",
  data() {
    return {
      form: {
        address: '',
      },
      nomatimURL: '',
      boundingArea: '',
      blockGroupURL: '',
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.geocodeURL = 'https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=' + this.form.address.replace(/ /g, '+') + '&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json'
      this.nomatimURL = 'https://nominatim.openstreetmap.org/search/' + this.form.address.replace(/ /g, '%20') + '?format=json&addressdetails=1&limit=1&polygon_svg=1'
      this.$store.dispatch('readDatasetAddress', this.nomatimURL)

      this.show = false;

      this.blockGroupURL = 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2019/MapServer/10/query?where=1%3D1&text=&objectIds=&time=&geometry=-73.98790414618122%2C+40.731761023489014%2C+-73.98000772284138%2C+40.72662265278456&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelContains&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson'
    },

    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.address = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style lang="scss">
@import "../styles/variables";

#addressLookup {
  z-index: 1000;
}

</style>
