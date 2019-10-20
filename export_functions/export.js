console.log("I am an export to RHINO function");

var myPointJson = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}

var sample = { "type": "FeatureCollection",
"features": [
  { "type": "Feature",
    "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
    "properties": {"prop0": "value0"}
    },
  { "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
        ]
      },
    "properties": {
      "prop0": "value0",
      "prop1": 0.0
      }
    },
  { "type": "Feature",
     "geometry": {
       "type": "Polygon",
       "coordinates": [
         [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
           [100.0, 1.0], [100.0, 0.0] ]
         ]

     },
     "properties": {
       "prop0": "value0",
       "prop1": {"this": "that"}
       }
     }
  ]
}

// // global variables
var rhino = null;
var _file = null;

// wait for the rhino3dm web assembly to load asynchronously
rhino3dm().then(function(m) {
  rhino = m; // global
  console.log("init");
  //run();
});

function export3dm() {

    // RHINO FILE
    _file = new rhino.File3dm();

  // INCOMING GEOJSON
   // units ? convert/ project X and Y... Z is default 0
  sample.features.forEach(feature => {

    if (feature.geometry.type == "Point") {
      var geo = feature.geometry.coordinates;
      var point = new rhino.Point([geo[0],geo[1],0]);

      var prop = feature.properties;
      var att = new rhino.ObjectAttributes();
    
      Object.keys(prop).forEach(p => {
        att.setUserString(p, prop[p]);
        point.setUserString(p,prop[p]);
      });

      _file.objects().add(point, att); 
      //console.log(point);
    }
    else if(feature.geometry.type == "LineString" )
    {
      //console.log("line", feature.geometry.coordinates)
      var geo = feature.geometry.coordinates;
      _points = new rhino.Point3dList();
      console.log(geo);
      geo.forEach(g => {
        _points.add(g[0],g[1],0);
      });

      var curve = rhino.NurbsCurve.create(false,1, _points);

      var prop = feature.properties;
      var att = new rhino.ObjectAttributes();
    
      Object.keys(prop).forEach(p => {
        att.setUserString(p, prop[p]);
        curve.setUserString(p,prop[p]);
      });

      _file.objects().addCurve(curve, att); 

    }
    else if(feature.geometry.type == "Polygon" ){
      var geo = feature.geometry.coordinates;
      _points = new rhino.Point3dList();
      console.log(geo);
      geo[0].forEach(g => {
        _points.add(g[0],g[1],0);
      });

      var curve = rhino.NurbsCurve.create(false,1, _points);

      var prop = feature.properties;
      var att = new rhino.ObjectAttributes();
    
      Object.keys(prop).forEach(p => {
        att.setUserString(p, prop[p]);
        curve.setUserString(p,prop[p]);
      });

      _file.objects().addCurve(curve, att); 
    }
    
});


  console.log(_file.objects());
 
//--------------------------TEST TEST
  //  // TO RHINO POINT
  //  var point = new rhino.Point([10,10,0]);
  //  point.setUserString("userstring","geometry");
  // //console.log("point", point);

 
  //  // TO RHINO CURVE
  //  _points = new rhino.Point3dList();
  //  _points.add(10,10,10);
  //  _points.add(1,1,1);

  //  var curve = rhino.NurbsCurve.create(false,1, _points);
  //  curve.setUserString("userstring","geometry");
  //  //console.log(curve);

  //  // ATTRIBUTES
  //  var att = new rhino.ObjectAttributes();
  //  att.setUserString("hello", "elcin");
  //  //att.setUserString("layer", "0"); // this sets the index, u might need to create the layer first
  
  // // attributes layer, name, geometry

  
  // //_file.objects().addCurve(curve);
  // _file.objects().add(point, att); // this one worked
  // _file.objects().addCurve(curve, att); 
 

   //--------------------------------------------------------




   console.log(_file);

  //  //DOWNLOAD

  //_file.write("model9999.3dm", 0);
 

    var base64 = _file.toByteArray();

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
    link.download = 'modelblob.3dm';
    link.dispatchEvent( new MouseEvent( 'click' ) );

    
  // var download = document.createElement('a');
  // download.href = 'data:application/octet-stream,' + new Blob(binaryData);
  // download.download = 'model7.3dm';
  // download.click();

  
}


function downloadFile(data, fileName, type="text/plain") {
  // Create an invisible A element
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);
  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(
    new Blob([data], { type })
  );
  // Use download attribute to set set desired file name
  a.setAttribute("download", fileName);
  // Trigger the download by simulating click
  a.click();
  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
 }


