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
    ],
    boundingBox: [],
    datasetFlag: false,
    blockGroupFlag: false
  },
  getters:{
    getDatasetAddress (state){
      return state.datasetAddress
    },
    getdatasetNames(state){
      return state.datasetNames
    },
    getDatasetBlockGroups(state){
      return state.datasetBlockGroups
    },
    getBoundingBox(state){
      return state.boundingBox
    },
    getDatasetFlag(state){
      return state.datasetFlag
    },
    getBlockGroupFlag(state){
      return state.blockGroupFlag
    }
  },
  mutations: {
    setDatasetAddress (state, newDatasetAddress) {
      state.datasetAddress = newDatasetAddress
    },
    setDatasetBlockGroups (state, newDatasetBlockGroups) {
      state.datasetBlockGroups = newDatasetBlockGroups
    },
    setDatasetFlag(state,newData){
      state.dataset = newData
    },
    setBoundingBox(state, newBoundingBox){
      var bbox = newBoundingBox[3]+"%2C"+newBoundingBox[0]+"%2C"+newBoundingBox[4]+"%2C"+newBoundingBox[1]
      state.boundingBox = bbox
    },
    setBlockGroupFlag(state, newBlockGroupFlag){
      state.blockGroupFlag = newBlockGroupFlag
    }
  },
  actions: {
    readBoundingBox: function(context,url){
      axios.get(url, function(){

      var json = {"result":
        {"input":
          {"benchmark":   {"id":"9","benchmarkName":"Public_AR_Census2010","benchmarkDescription":"Public Address Ranges - Census 2010 Benchmark","isDefault":false},
          "vintage":{
            "id":"910","vintageName":"Census2010_Census2010","vintageDescription":"Census2010 Vintage - Census2010 Benchmark","isDefault":true},
            "address":{"address":"44 wyckoff st, brooklyn, ny"}
          },
          "addressMatches":[
            {
              "matchedAddress":"44 Wyckoff St, BROOKLYN, NY, 11201","coordinates":{"x":-73.991974,"y":40.68648},"tigerLine":{"tigerLineId":"59075230","side":"R"},"addressComponents":{"fromAddress":"2","toAddress":"70","preQualifier":"","preDirection":"","preType":"","streetName":"Wyckoff","suffixType":"St","suffixDirection":"","suffixQualifier":"","city":"BROOKLYN","state":"NY","zip":"11201"},"geographies":{"Census Blocks":[{"SUFFIX":"","POP100":444,"GEOID":"360470069004001","CENTLAT":"+40.6862799","BLOCK":"4001","AREAWATER":0,"STATE":"36","BASENAME":"4001","OID":210403974805770,"LSADC":"BK","FUNCSTAT":"S","INTPTLAT":"+40.6862799","NAME":"Block 4001","OBJECTID":6605050,"TRACT":"006900","CENTLON":"-073.9924418","BLKGRP":"4","AREALAND":19909,"HU100":192,"INTPTLON":"-073.9924418","MTFCC":"G5040","LWBLKTYP":"L","UR":"","COUNTY":"047"}]}}
          ]
        }
      }

      // pick the first matching address as the most likely candidate
      var addressMatch = json.result.addressMatches[0]

      context.commit('setDatasetAddress', addressMatch)

      // this is how I'm generating a bounding area to capture block groups
      var minX = addressMatch.coordinates.x - .005
      var maxX = addressMatch.coordinates.x + .005
      var minY = addressMatch.coordinates.y - .005
      var maxY = addressMatch.coordinates.y + .005

      var blockGroupURL = "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2019/MapServer/10/query?where=1%3D1&text=&objectIds=&time=&geometry="+this.boundingBox+"&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelContains&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson"

      var blockGroupsURL = 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2019/MapServer/10/query?where=1%3D1&text=&objectIds=&time=&geometry=' + minX + '%2C+' + maxY + '%2C+' + maxX + '%2C+' + minY + '&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelContains&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson'

      console.log(blockGroupsURL)

      axios.get(blockGroupsURL, function(response){

      }).then(function(response){
        console.log(response.data.features)

        context.commit('setDatasetBlockGroups', response.data)

        let stateCode = addressMatch.geographies['Census Blocks'][0].STATE
        let county = addressMatch.geographies['Census Blocks'][0].COUNTY
        let dataVariables = "B01001_001E"

        let countyURL = "https://api.census.gov/data/2017/acs/acs5?get=NAME,"+dataVariables+"&for=block%20group:*&in=state:"+stateCode+"%20county:"+county+"&key=7a8c4da8bd74f292935d694e25d4c4b6e38fd08a"

        return axios.get(countyURL)
        }).then(response =>{
          console.log(response.data)

          for(var i = 0;i < response.data.length; i++){

            let stateCode = response.data[i][3]
            let countyCode = response.data[i][4]
            let tractCode = response.data[i][2]
            let blockGroupCode = response.data[i][5]

            let geoid = stateCode + countyCode + tractCode + blockGroupCode

            console.log(geoid)
          }

      })
    },
    readACSDataURL: function(context, variable){
      console.log("TCL: variable", variable)

      let stateCode = "36"
      let county= "025"
      let dataVariables = "B01001_001E"

      let url = "https://api.census.gov/data/2017/acs/acs5?get=NAME,"+dataVariables+"&for=block%20group:*&in=state:"+stateCode+"%20county:"+county+"&key=7a8c4da8bd74f292935d694e25d4c4b6e38fd08a"

      axios.get(url).then(response =>{
          console.log("readACSDataURL",response)
          context.commit('setDataset', true)
        })
        .catch(error =>{
          console.log(error);
        })
    }
  }
})
