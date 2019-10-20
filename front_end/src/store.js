import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datasetAddress: null,
    datasetNames: [
      {
        name:'Household Income',
        variable: "B01001_001E"
      }
    ]
  },
  getters:{
    getDatasetAddress (state){
      return state.datasetAddress
    },
    getdatasetNames(state){
      return state.datasetNames
    }
  },
  mutations: {
    setDatasetAddress (state, newDatasetAddress) {
      state.datasetAddress = newDatasetAddress
    },
    setData(state,newData){
      state.data = newData
    }
  },
  actions: {
    readDatasetAddress: function (context, url) {

      axios.get(url, function(response){

      }).then(function(response){
        // do stuff
        // manipulate data here
        // once data is ready
        context.commit('setDatasetAddress', response.data)
      })
    },
    readACSDataURL: function(context, variable){
    console.log("TCL: variable", variable)

      let stateCode = "36"
      let county= "025"
      let dataVariables = "B01001_001E"

      let url = "https://api.census.gov/data/2017/acs/acs5?get=NAME,"+dataVariables+"&for=block%20group:*&in=state:"+stateCode+"%20county:"+county+"&key=7a8c4da8bd74f292935d694e25d4c4b6e38fd08a"

      axios.get(url).then(response =>{
        console.log(response)
        })
        .catch(error =>{
        console.log(error);
        })
    }
  }
})
