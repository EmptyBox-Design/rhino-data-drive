console.log("I am an export to RHINO function");

var mygeoJson = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
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
  _points = new rhino.Point3dList();
  _points.add(10,10,10);
  _points.add(1,1,1);



   var point = new rhino.Point([10,10,10]);
   point.setUserString("userstring","geometry");

   console.log("point", point);

  //  var curve = new rhino.Polyline();
  //  curve.add(0,0,0);
  //  curve.add(10,10,10);
  //  console.log(curve);
   //curve.setUserString("hello","elcin"); // this didnot worked use attributes instead!

   var curve = rhino.NurbsCurve.create(false,1, _points);
   curve.setUserString("userstring","geometry");

   console.log(curve);

   var att = new rhino.ObjectAttributes();
   att.setUserString("hello", "elcin");
   //att.setUserString("layer", "0");
   //curve.setUserString("hello","elcin");
   // if close can we create rhino.surface or mesh

  // How to set user string to Curve
  // layers ? 

  // attributes layer, name, geometry

  _file = new rhino.File3dm();
  // units 
  //_file.objects().addCurve(curve);
  _file.objects().add(point, att); // this one worked
  _file.objects().addCurve(curve, att); 
 

 

   console.log(_file.objects());

   var zip = new JSZip();
 
   zip.file("zipTest.3dm", _file)
   zip.generateAsync({
       type: "base64"
   }).then(function(content) {
       window.location.href = "data:application/zip;base64," + content;
   });  
  
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


