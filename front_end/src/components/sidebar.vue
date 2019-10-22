<template>
<div class="wrapper">
 <nav id="sidebar" class="p-3">
   <div class="row h-100">
     <div class="col sidebar-header pb-4">
       <h1 class="font-weight-bold">Sparrow</h1>
     </div>
     <div class="col-12">
       <h5>Please Select Your Dataset</h5>
       <div class="active">
         <label for="dropdown">American Community Survey Data</label>
         <b-dropdown id="dropdown-1" text="Dropdown" class="m-0 w-100">
           <b-dropdown-item v-for="(dataset, index) in datasets" :key="index" @click="dataSelect(dataset.variable)">{{dataset.name}}</b-dropdown-item>
         </b-dropdown>
       </div>
     </div>
     <div class="col align-self-end active">
       <b-button class="w-100" type="submit" variant="primary" @click="download">Download</b-button>
     </div>
   </div>
 </nav>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: "sidebar",
  data(){
    return {
    }
  },
  created(){

  },
  computed:{
    ...mapGetters({
      datasets: 'getdatasetNames',
      datasetFlag: 'getDatasetFlag',
      geojsonData: 'getDatasetBlockGroups'
    }),
  },
  methods:{
    export3dm: (data) => {

      let rhino = null
      let file = null
      
      rhino3dm().then(function(library){

        rhino = library
        file = new rhino.File3dm();

        data.forEach(function(d,i){
          let points = new rhino.Point3dList();
          let att = new rhino.ObjectAttributes();

          console.log(d);

          d.geometry.coordinates[0].forEach(function(j,k){
            points.add(j[0], j[1], 0)
          })

          var curve = rhino.NurbsCurve.create(false,1, points);
          let value = d.properties['dataValue'].toString()

          att.setUserString('Household Income', value)
          curve.setUserString('Household Income', value)

          file.objects().addCurve(curve, att);
        })

        console.log(file.objects())

        var base64 = file.toByteArray();

        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);

        for (var i = 0; i < binaryLen; i++) {
          var ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }

        var blob = new Blob([bytes], {type: "application/octet-stream"});
        
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = 'model_download.3dm';
        link.dispatchEvent( new MouseEvent( 'click' ) );
      })
    },
    download(){
      let json = this.geojsonData
      this.export3dm(this.geojsonData.features);
    },
    dataSelect(variable){
      this.$store.dispatch("readACSDataURL", variable)
    },
    // fires whenever the address is updated in the $store
    modelInputSubscriber: function () {
      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case 'setDatasetFlag':
            this.$store.dispatch()
            break
        }
      })
    }
  }
}
</script>
<style lang="scss">
.wrapper {
 display: flex;
 width: 100%;
 align-items: stretch;
}
.wrapper {
 display: flex;
 align-items: stretch;
}
#sidebar {
 min-width: 250px;
 max-width: 250px;
 height: 100vh;
}
#sidebar.active {
 margin-left: -250px;
}
#sidebar {
 min-width: 250px;
 max-width: 250px;
 z-index: 2;
 background: $white;
}
@media (max-width: 768px) {
 #sidebar {
     margin-left: -250px;
 }
 #sidebar.active {
     margin-left: 0;
 }
}
</style>