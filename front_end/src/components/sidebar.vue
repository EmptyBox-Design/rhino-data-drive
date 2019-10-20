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
          <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-0 w-100">
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
  computed:{
    ...mapGetters({
      datasets: 'getdatasetNames',
      datasetFlag: 'getDatasetFlag'
    })
  },
  methods:{
    download(){
      console.log("downloading dataset");
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
