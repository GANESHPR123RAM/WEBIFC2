import * as THREE from "three";
import * as BUI from "@thatopen/ui";
import Stats from "stats.js/src/Stats";
import * as OBC from "@thatopen/components";

const container = document.getElementById("container")!;
const components = new OBC.Components();

// 🌎 Setting up the world
const worlds = components.get(OBC.Worlds);
const world = worlds.create<
  OBC.SimpleScene,
  OBC.SimpleCamera,
  OBC.SimpleRenderer
>();

// 🎬 Starting the Scene
world.scene = new OBC.SimpleScene(components);
world.renderer = new OBC.SimpleRenderer(components, container);
world.camera = new OBC.SimpleCamera(components);

components.init();

// 🏗️ Setup scene
world.scene.setup();
world.scene.three.background = null;

// 📦 Adding objects
const material = new THREE.MeshLambertMaterial({
  color: "#6528D7",
  transparent: true,
  opacity: 0.2,
});
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, material);
world.scene.three.add(cube);

cube.rotation.x += Math.PI / 4.2;
cube.rotation.y += Math.PI / 4.2;
cube.rotation.z += Math.PI / 4.2;
cube.updateMatrixWorld();

// 🎥 Add camera
world.camera.controls.setLookAt(3, 3, 3, 0, 0, 0);

// 📊 Add Statistics
const stats = new Stats();
stats.showPanel(2);
document.body.append(stats.dom);
stats.dom.style.left = "0px";
stats.dom.style.zIndex = "unset";
world.renderer.onBeforeUpdate.add(() => stats.begin());
world.renderer.onAfterUpdate.add(() => stats.end());
