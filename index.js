import * as three from './threejs/build/three.module.js'
import {OrbitControls} from './threejs/examples/jsm/controls/OrbitControls.js'

var scene, camera, renderer, controller;

const init = () =>{
    //buat scene
    scene = new three.Scene();

    //buat camera
    let fov = 45;
    let aspect = window.innerWidth/window.innerHeight;
    let near = 0.1;
    let far = 1000;
    camera = new three.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(60, 30, 100);
    camera.lookAt(0, 0, 0);

    createObjects();

    //buat renderer
    renderer = new three.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    //buat controller
    controller = new OrbitControls(camera, renderer.domElement);

}

const render = () =>{
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controller.update();
}

window.onload = () =>{
    init();
    render();
}

window.onresize = () =>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}

const createObjects = () =>{
    let pointLight = createPointLight('#FFFFFF', 1, 1000, 0);
    pointLight.position.set(100, 100, 100);

    let ambient = createAmbientLight('#FFFFFF', 0.2);

    let plane = createPlane(75, 75, '#FFFFFF');
    plane.position.set(0, 0, 0);
    plane.rotation.set(-Math.PI/2, 0, 0);

    let fire = createSphere(1, 10, 10, '#FDCF19', true, '#DB1D1D');
    fire.position.set(0, 3, 0);

    let thruster = createCylinder(1, 1.3, 2, 100, 10, false, '#676B6F', 0.2, 0.8);
    thruster.position.set(0, 4, 0);

    let tail = createCylinder(3, 2, 2, 100, 10, false, '#FFFFFF', 0.2, 0.5);
    tail.position.set(0, 6, 0);

    let body = createCylinder(3, 3, 6, 100, 10, false, '#FFFFFF', 0.2, 0.5);
    body.position.set(0, 10, 0);

    let head = createCylinder(2, 3, 3, 100, 10, false, '#FFFFFF', 0.2, 0.5);
    head.position.set(0, 14.5, 0);

    let Window = createWindow(1.5, 20, 20, '#004E8A', false, '#553300');
    Window.position.set(2, 11, 0);

    let nose = createCone(2, 4.5, 100, 5, false, '#BD1D11', 50);
    nose.position.set(0, 18.25, 0);

    let leg1 = createLeg();
    leg1.position.set(-4, 0, 4);
    leg1.rotation.set(0,  (135 * Math.PI) / 180, 0);

    let leg2 = createLeg();
    leg2.position.set(4, 0, 4);
    leg2.rotation.set(0,  (225 * Math.PI) / 180, 0);

    let leg3 = createLeg();
    leg3.position.set(4, 0, -4);
    leg3.rotation.set(0,  (315 * Math.PI) / 180, 0);

    let leg4 = createLeg();
    leg4.position.set(-4, 0, -4);
    leg4.rotation.set(0,  (45 * Math.PI) / 180, 0);



    let objects = [
        pointLight,
        ambient,
        plane,
        fire,
        thruster,
        tail,
        body,
        head,
        Window,
        nose,
        leg1,
        leg2,
        leg3,
        leg4
    ];

    objects.forEach(obj =>{
        scene.add(obj)
    });
}

const createPointLight = (color, intensity, distance, decay) =>{
    let light = new three.PointLight(color, intensity, distance, decay);
    light.castShadow = true;

    return light;
}

const createAmbientLight = (color, intensity)=>{
    let light = new three.AmbientLight(color, intensity);
    return light;
}

const createPlane = (width, height, color) =>{
    let loader = new three.TextureLoader();
    let img = loader.load('./asset/moon_texture.jpg');
    let normalImg = loader.load('./asset/normal_moon_texture.jpg');

    let geometry = new three.PlaneGeometry(width, height);
    let material = new three.MeshStandardMaterial({
        color: color,
        map: img,
        normalMap: normalImg,
        side: three.DoubleSide

    });

    let mesh = new three.Mesh(geometry, material);
    mesh.receiveShadow = true;

    return mesh;
}

const createSphere = (radius, widthSeg, heightSeg, color, wireframe, emissive) =>{
    let geometry = new three.SphereGeometry(radius, widthSeg, heightSeg);
    let material = new three.MeshStandardMaterial({
        color: color,
        wireframe: wireframe,
        emissive: emissive
    });

    let mesh = new three.Mesh(geometry, material);
    mesh.castShadow = true;

    return mesh;
}

const createWindow = (radius, widthSeg, heightSeg, color, wireframe, emissive) =>{
    let geometry = new three.SphereGeometry(radius, widthSeg, heightSeg);
    let material = new three.MeshLambertMaterial({
        color: color,
        wireframe: wireframe,
        emissive: emissive
    });

    let mesh = new three.Mesh(geometry, material);
    mesh.castShadow = true;

    return mesh;
}

const createCylinder = (radTop, radBot, height, radSeg, heightSeg, openEd, color, rough, metal) =>{
    let geometry = new three.CylinderGeometry(radTop, radBot, height, radSeg, heightSeg, openEd);
    let material = new three.MeshStandardMaterial({
        color: color,
        roughness: rough,
        metalness: metal
    });

    let mesh = new three.Mesh(geometry, material);

    mesh.castShadow = true;
    return mesh;
}

const createCone = (rad, height, radSeg, heightSeg, openEd, color, shiny) =>{
    let geometry = new three.ConeGeometry(rad, height, radSeg, heightSeg, openEd);
    let material = new three.MeshPhongMaterial({
        color: color,
        shininess: shiny
    });

    let mesh = new three.Mesh(geometry, material);
    mesh.castShadow = true;
    return mesh;
};

const createBox = (width, height, depth, color, shiny) =>{
    let geometry = new three.BoxGeometry(width, height, depth);
    let material = new three.MeshPhongMaterial({
        color: color,
        shininess: shiny
    });

    let mesh = new three.Mesh(geometry, material);
    mesh.castShadow = true;
    return mesh;
}

const createLeg = () =>{
    let bottom = createCylinder(0.8, 0.5, 2, 100, 1, false, '#B01D11', 0.2, 1);
    bottom.position.set(0, 1, 0);

    let body = createCylinder(0.8, 0.8, 6, 100, 1, false, 'B01D11', 0.2, 1);
    body.position.set(0, 5, 0);

    let top = createCone(0.8, 2, 100, 10, false, '#540600', 0.5);
    top.position.set(0, 9, 0);

    let connector = createBox(0.5, 1.5, 4, '#540600', 0.5);
    connector.position.set(0, 6.5, 1.5);
    connector.rotation.set(-Math.PI/6, 0, 0);

    let group = new three.Group();

    group.add(bottom);
    group.add(body);
    group.add(top);
    group.add(connector);

    return group;
}
    


