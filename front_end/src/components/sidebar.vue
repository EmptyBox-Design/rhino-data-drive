<template>
<div class="wrapper">
  <nav id="sidebar">
    <div class="sidebar-header">
        <h1>Data Drive</h1>
    </div>
    <h4>Please Select Your Dataset</h4>
    <div class="active">
      <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
        <b-dropdown-item v-for="(dataset, index) in datasets" :key="index">{{dataset.name}}</b-dropdown-item>
      </b-dropdown>
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
  mounted(){
  },
  computed:{
    ...mapGetters({
      datasets: 'getdatasetNames',
    })
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