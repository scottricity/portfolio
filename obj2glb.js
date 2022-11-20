//discard

const obj2gltf = require("obj2gltf");
const fs = require("fs");
const options = {
  binary: true,
};
obj2gltf("./public/scottricity_3d_text.obj", options).then(function (glb) {
  fs.writeFileSync("scottricity_3d_text.glb", glb);
});