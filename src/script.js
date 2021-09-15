import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

let vercelPath = 'https://next-js-blog-6f9808ir0-bayswaterpc.vercel.app';
function loadWindmill(scene) {
    let vercelMtl = `${vercelPath}/models/windmill/windmill-fixed.mtl`;
    let vercelOBJ = `${vercelPath}/models/windmill/windmill.obj`;
    console.log(vercelMtl);
    console.log(vercelOBJ);
    // let threejsFundamentalsMTL = 'https://threejsfundamentals.org/threejs/resources/models/windmill/windmill-fixed.mtl';
    // let threejsFundamentalsOBJ = 'https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj';
    const mtlLoader = new MTLLoader();
    mtlLoader.load(vercelMtl, (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load(vercelOBJ, (root) => {
            console.log("adding root", root, mtl);
            scene.add(root);
        });
    });
}


function loadCpcObj(scene) {
    let vercelOBJ = `${vercelPath}/models/cpc_texture_mesh/texture_mesh_0_766c382a-4f08-4919-9a34-c6e0c744f0ee.obj`;
    console.log(vercelOBJ);

    const objLoader = new OBJLoader();
    objLoader.load(vercelOBJ, (root) => {
        console.log("adding root", root);
        scene.add(root);
    });

}

function loadCpcTextureMesh(scene) {
    let vercelMtl = `${vercelPath}/models/cpc_texture_mesh/texture_mesh_0_766c382a-4f08-4919-9a34-c6e0c744f0ee.mtl`;
    let vercelOBJ = `${vercelPath}/models/cpc_texture_mesh/texture_mesh_0_766c382a-4f08-4919-9a34-c6e0c744f0ee.obj`;
    console.log(vercelMtl);
    console.log(vercelOBJ);
    // let threejsFundamentalsMTL = 'https://threejsfundamentals.org/threejs/resources/models/windmill/windmill-fixed.mtl';
    // let threejsFundamentalsOBJ = 'https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj';
    const mtlLoader = new MTLLoader();
    mtlLoader.load(vercelMtl, (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load(vercelOBJ, (root) => {
            console.log("adding root", root, mtl);
            scene.add(root);
        });
    });
}

function main() {
    // Canvas
    const canvas = document.querySelector('canvas.webgl')
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);
  
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();
  
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    {
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(5, 10, 2);
        scene.add(light);
        scene.add(light.target);
    }

    /**
     * Sizes
     */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    //loadWindmill(scene);
    // loadCpcTextureMesh(scene);
    loadCpcObj(scene);
    
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();