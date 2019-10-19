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

   var curve = new rhino.Polyline();
   curve.add(0,0,0);
   curve.add(10,10,10);
   console.log(curve);
   //curve.setUserString("hello","elcin"); // this didnot worked use attributes instead!

   var att = new rhino.ObjectAttributes();
   att.setUserString("hello", "elcin");
   //curve.setUserString("hello","elcin");
   // if close can we create rhino.surface or mesh

  // How to set user string to Curve
  // layers ? 

  // attributes layer, name, geometry

  _file = new rhino.File3dm();
  // units 
  //_file.objects().addCurve(curve);
  //_file.objects().add(point, att); // this one worked
  _file.objects().addCurve(curve, att); 
 
 

   console.log(_file.objects());
  //rhino.save();
  
}


