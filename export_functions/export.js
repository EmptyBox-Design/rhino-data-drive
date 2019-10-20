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
  // units ? convert/ project X and Y... Z is default 0

   // TO RHINO POINT
   var point = new rhino.Point([10,10,0]);
   point.setUserString("userstring","geometry");
  //console.log("point", point);

 
   // TO RHINO CURVE
   _points = new rhino.Point3dList();
   _points.add(10,10,10);
   _points.add(1,1,1);

   var curve = rhino.NurbsCurve.create(false,1, _points);
   curve.setUserString("userstring","geometry");
   //console.log(curve);

   // ATTRIBUTES
   var att = new rhino.ObjectAttributes();
   att.setUserString("hello", "elcin");
   //att.setUserString("layer", "0"); // this sets the index, u might need to create the layer first
  
  // attributes layer, name, geometry

  
  //_file.objects().addCurve(curve);
  _file.objects().add(point, att); // this one worked
  _file.objects().addCurve(curve, att); 
 

   console.log(_file);


  
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


