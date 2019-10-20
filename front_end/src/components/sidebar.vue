<template>
<div class="wrapper">
  <nav id="sidebar">
    <div class="row">
      <div class="col-12 sidebar-header">
        <h1>Data Drive</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4>Please Select Your Dataset</h4>
        <div class="active">
          <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
            <b-dropdown-item v-for="(dataset, index) in datasets" :key="index">{{dataset.name}}</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
    <div class="spacer-md"></div>
    <div class="row">
      <div class="col-8 active mx-auto">
        <b-button type="submit" variant="primary" @click="download">Download</b-button>
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
    })
  },
  methods:{
    download(){
      console.log("downloading dataset");
    }
  }
}
</script>

<style lang="scss">
.spacer-md{
  padding: 4rem;
}
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
}

#sidebar.active {
  margin-left: -250px;
}
#sidebar {
  min-width: 250px;
  max-width: 250px;
  min-height: calc(100vh - #{$navbar-height});

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