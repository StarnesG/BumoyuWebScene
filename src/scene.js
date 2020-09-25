import {
    Engine, Scene, FreeCamera, HemisphericLight, PointLight, Vector3, Color3,
    StandardMaterial, Texture, Mesh, CubeTexture, SpriteManager, Sprite
} from '@babylonjs/core'
import React, { useEffect, useRef, useState } from 'react'
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import "./App.css";


export default (props) => {
    const reactCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, faceData, ...rest } = props;
    const [loaded, setLoaded] = useState(false);
    const [scene, setScene] = useState(null);

    useEffect(() => {
        if (window) {
            const resize = () => {
                if (scene) {
                    scene.getEngine().resize();
                }
            }
            window.addEventListener('resize', resize);

            return () => {
                window.removeEventListener('resize', resize);
            }
        }
    }, [scene]);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            let engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            setScene((preState) => {
                let scene = new Scene(engine, sceneOptions)
                scene.autoClear = false
                // scene.debugLayer.show()

                if (scene.isReady()) {
                    // Light
                    var spot = new PointLight("spot", new Vector3(157, 70, 62), scene);
                    spot.diffuse = new Color3(1, 1, 1);
                    spot.specular = new Color3(0, 0, 0);
                    spot.intensity = 0.5;

                    // Ground
                    var groundMaterial = new StandardMaterial("ground", scene);
                    groundMaterial.diffuseTexture = new Texture("pic/ground2.jpg", scene);
                    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                    var ground = Mesh.CreateGroundFromHeightMap("ground", "pic/ground4.jpg", 440, 440, 60, 10, 0, scene, false);
                    ground.material = groundMaterial;
                    ground.rotation.y = 1.2;
                    ground.position.x = 80;
                    ground.position.z = -30;                   

                    // Fog
                    scene.fogMode = Scene.FOGMODE_EXP;
                    scene.fogColor = new Color3(0.09, 0.39, 0.72);
                    scene.fogDensity = 0.004;

                    // Skybox
                    var skybox = Mesh.CreateBox("skyBox", 2000.0, scene);
                    var skyboxMaterial = new StandardMaterial("skyBox", scene);
                    skyboxMaterial.backFaceCulling = false;
                    skyboxMaterial.reflectionTexture = new CubeTexture("pic/skybox", scene);
                    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
                    skybox.material = skyboxMaterial;

                    // Sphere to see the light's position
                    // var sun = Mesh.CreateSphere("sun", 100, 10, scene);
                    // sun.material = new StandardMaterial("sun", scene);
                    // sun.material.emissiveColor = new Color3(0.09, 0.39, 0.72);

                    //Sprite
                    var spriteManagerSeaweeds = new SpriteManager("seaweedsManager", "scenes/seaweeda.png", 200, 512, scene);
                    for (var i = 0; i < 50; i++) {
                        var seaweed = new Sprite("seaweed", spriteManagerSeaweeds);
                        seaweed.position.x = Math.random() * 360 - 100;
                        seaweed.position.z = Math.random() * 360 - 210;
                        seaweed.width = Math.random() * 5 + 14;
                        seaweed.height = Math.random() * 5 + 14;
                        seaweed.position.y = seaweed.height - 6;
                        // seaweed.isPickable = true;
                    }

                    var spriteManagerFish = new SpriteManager("fishManager", "scenes/fish1a.png", 200, 500, scene);
                    for (var j = 0; j < 4; j++) {
                        var fish = new Sprite("fish", spriteManagerFish);
                        fish.position.x = Math.random() * 340 - 90;
                        fish.position.z = Math.random() * 340 - 200;
                        fish.width = 25;
                        fish.height = 25;
                        fish.position.y = Math.random() * 70 + 10;
                        // fish.isPickable = true;
                    }

                    var spriteManagerFisha = new SpriteManager("fishaManager", "scenes/fish2.png", 200, 400, scene);
                    for (var k = 0; k < 4; k++) {
                        var fisha = new Sprite("fisha", spriteManagerFisha);
                        fisha.position.x = Math.random() * 340 - 90;
                        fisha.position.z = Math.random() * 340 - 200;
                        fisha.width = 15;
                        fisha.height = 15;
                        fisha.position.y = Math.random() * 70 + 10;
                        // seaweed.isPickable = true;
                    }

                    var spriteManagerFishca = new SpriteManager("fishcManager", "scenes/fish3a.png", 200, 400, scene);
                    for (var o = 0; o < 6; o++) {
                        var fishc = new Sprite("fishc", spriteManagerFishca);
                        fishc.position.x = Math.random() * 340 - 90;
                        fishc.position.z = Math.random() * 340 - 200;
                        fishc.width = 8;
                        fishc.height = 8;
                        fishc.position.y = Math.random() * 70 + 10;
                        // seaweed.isPickable = true;
                    }

                    var spriteManagerbubble = new SpriteManager("bubbleManager", "scenes/bubbleAAA.png", 200, 600, scene);
                    for (var l = 0; l < 6; l++) {
                        var bubble = new Sprite("bubble", spriteManagerbubble);
                        bubble.position.x = Math.random() * 340 - 90;
                        bubble.position.z = Math.random() * 340 - 200;
                        bubble.width = 60;
                        bubble.height = 60;
                        bubble.position.y = Math.random() * 40 + 30;
                        // seaweed.isPickable = true;
                    }

                    var spriteManagerbubbleA = new SpriteManager("bubbleBManager", "scenes/bubbleB.png", 200, 400, scene);
                    for (var m = 0; m < 4; m++) {
                        var bubbleA = new Sprite("bubbleB", spriteManagerbubbleA);
                        bubbleA.position.x = Math.random() * 340 - 90;
                        bubbleA.position.z = Math.random() * 340 - 200;
                        bubbleA.width = 25;
                        bubbleA.height = 25;
                        bubbleA.position.y = Math.random() * 70 + 25;
                        // seaweed.isPickable = true;
                    }

                    //相机引导定位球
                    var startC = Mesh.CreateSphere("sun", 100, 0.1, scene);
                    startC.material = new StandardMaterial("startC", scene);
                    startC.material.emissiveColor = new Color3(0.28, 0.21, 0.11);
                    startC.position.x = 100;
                    startC.position.y = 10;
                    startC.position.z = -20;

                    //开场跟随相机 
                    // var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(470, 360, -110), scene);
                    // camera.radius = 100;
                    // camera.heightOffset = 15;
                    // camera.rotationOffset = 35;
                    // camera.cameraAcceleration = 0.03
                    // camera.maxCameraSpeed = 1.4
                    // camera.lockedTarget = startC;

                    //*************body camera******************
                    var cameraB = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(157.35, 14.32, 61.91), scene);
                    cameraB.setTarget(new BABYLON.Vector3(100, 1, -20));
                    const canvas = scene.getEngine().getRenderingCanvas()
                    cameraB.attachControl(canvas, true);

                    var body = Mesh.CreateSphere("body", 100, 1.1, scene);
                    body.material = new StandardMaterial("body", scene);
                    body.material.emissiveColor = new Color3(0.09, 0.39, 0.72);
                    body.scaling.y=2;


                    // ***************Boat*********************
                    var prom = BABYLON.SceneLoader.ImportMeshAsync('', "scenes/submarineB/", "scene.gltf", scene, function (meshes) {
                        scene.createDefaultEnvironment();
                    });
                    prom.then((v) => {
                        // console.log(v)
                        for (i = 0; i < 8; i++) {
                            // let pos = v.meshes[i].position
                            let sca = v.meshes[i].scaling
                            sca.x = 1.2;
                            sca.y = 1.2;
                            sca.z = 1.2;

                        }
                    })

                    var Boatlight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(30, 35, 0), new BABYLON.Vector3(30, -70, 0), Math.PI / 2, 1.2, scene);

                    var box = BABYLON.Mesh.CreateBox("Box", 50, scene);
                    box.material = new BABYLON.StandardMaterial("boatbox", scene);
                    // body.material.emissiveColor = new Color3(0.09, 0.39, 0.72);
                    box.position = new BABYLON.Vector3(-13, 27, 0);
                    box.scaling.x = 2.1;
                    box.scaling.y = 0.9;
                    box.hasVertexAlpha = true;
                    box.visibility = 0;

                    //********rock************* */
                    var rock = BABYLON.SceneLoader.ImportMeshAsync('', "scenes/coral/", "scene.gltf", scene, function (meshes) {
                        scene.createDefaultEnvironment();
                    });
                    rock.then((v) => {
                        console.log(v)
                        for (i = 1; i < 3; i++) {
                            let pos = v.meshes[i].position
                            let sca = v.meshes[i].scaling
                            sca.x = 10;
                            sca.y = 10;
                            sca.z = 10;
                            pos.x = -20;
                            pos.y = 6;
                            pos.z = 60;

                        }
                    })
                    //************human***************
                    var human = BABYLON.SceneLoader.ImportMeshAsync('', "scenes/astronaut/", "scene.gltf", scene, function (meshes) {
                        scene.createDefaultEnvironment();
                    });
                    human.then((v) => {
                        // console.log(v.meshes)
                       
                        for (i = 0; i < 2; i++) {
                            let pos = v.meshes[i].position;
                            let sca = v.meshes[i].scaling;
                            // let rot=v.meshes[1].rotation;
                            // rot.isNonUniform=true;
                            // rot.x=1;
                            // rot.y=1;
                            // rot.z=1;
                            pos.y=7;
                            pos.z=50;
                            pos.x=50;
                            sca.x = 9;
                            sca.y = 9;
                            sca.z = 9;

                        }
                    })

                    //***********空气墙****************
                    var box2 = BABYLON.Mesh.CreateBox("Box2", 440, scene);
                    box2.position = new BABYLON.Vector3(5, 80, 170);
                    box2.rotation.y = 1.2;
                    box2.scaling.y = 0.4;
                    box2.scaling.x = 0.01;
                    box2.hasVertexAlpha = true;
                    box2.visibility = 0;
                    var box3 = BABYLON.Mesh.CreateBox("Box3", 440, scene);
                    box3.position = new BABYLON.Vector3(160, 80, -230);
                    box3.rotation.y = 1.2;
                    box3.scaling.y = 0.4;
                    box3.scaling.x = 0.01;
                    box3.hasVertexAlpha = true;
                    box3.visibility = 0;
                    var box4 = BABYLON.Mesh.CreateBox("Box4", 440, scene);
                    box4.position = new BABYLON.Vector3(-120, 80, -115);
                    box4.rotation.y = 1.2;
                    box4.scaling.y = 0.4;
                    box4.scaling.z = 0.01;
                    box4.hasVertexAlpha = true;
                    box4.visibility = 0;
                    var box5 = BABYLON.Mesh.CreateBox("Box5", 440, scene);
                    box5.position = new BABYLON.Vector3(285, 80, 52);
                    box5.rotation.y = 1.2;
                    box5.scaling.y = 0.4;
                    box5.scaling.z = 0.01;
                    box5.hasVertexAlpha = true;
                    box5.visibility = 0;

                    //************碰撞与重力*************
                    scene.gravity = new BABYLON.Vector3(0, -1.1, 0);
                    scene.collisionsEnabled = true;
                    cameraB.applyGravity = false;
                    cameraB.ellipsoid = new BABYLON.Vector3(0.5, 10, 0.5);
                    cameraB.checkCollisions = false;
                    ground.checkCollisions = true;
                    box.checkCollisions = true;
                    box2.checkCollisions = true;
                    box3.checkCollisions = true;
                    box4.checkCollisions = true;
                    box5.checkCollisions = true;

                    // /*********************************Start World Axes********************/
                    // var showAxis = function (size) {
                    //     var makeTextPlane = function (text, color, size) {
                    //         var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
                    //         dynamicTexture.hasAlpha = true;
                    //         dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
                    //         var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
                    //         plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
                    //         plane.material.backFaceCulling = false;
                    //         plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
                    //         plane.material.diffuseTexture = dynamicTexture;
                    //         return plane;
                    //     };

                    //     var axisX = BABYLON.Mesh.CreateLines("axisX", [
                    //         new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
                    //         new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
                    //     ], scene);
                    //     axisX.color = new BABYLON.Color3(1, 0, 0);
                    //     var xChar = makeTextPlane("X", "red", size / 10);
                    //     xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
                    //     var axisY = BABYLON.Mesh.CreateLines("axisY", [
                    //         new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
                    //         new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
                    //     ], scene);
                    //     axisY.color = new BABYLON.Color3(0, 1, 0);
                    //     var yChar = makeTextPlane("Y", "green", size / 10);
                    //     yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
                    //     var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
                    //         new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
                    //         new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
                    //     ], scene);
                    //     axisZ.color = new BABYLON.Color3(0, 0, 1);
                    //     var zChar = makeTextPlane("Z", "blue", size / 10);
                    //     zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
                    // };
                    // showAxis(400)
                    // console.log(cameraB)
                    scene.registerBeforeRender(function () {
                        // console.log(cameraB.rotation)
                        body.position.z = cameraB.position.z;
                        body.position.y = cameraB.position.y - 5;
                        body.position.x = cameraB.position.x;
                        // spot.position.x -= 0.3;
                        // spot.position.z -= 0.6;
                        // spot.position.y = 45;                       
                        // if (spot.position.x < -70) {
                        //     spot.position.x = 200;
                        //     spot.position.z = 200;
                        // };
                        // camera.heightOffset -= 0.05;
                        // if (camera.heightOffset < -0.5) {
                        //     camera.dispose();
                        // }

                    });

                } else {
                    scene.onReadyObservable.addOnce(scene => {
                        let camera = new FreeCamera("camera1", new Vector3(0, 2, -7), scene);
                        camera.setTarget(Vector3.Zero());
                        camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
                        let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
                        light.intensity = 0.6;
                    });
                }
                engine.runRenderLoop(() => {
                    scene.render();
                })

                return scene
            })
        }

        return () => {
            if (scene !== null) {
                scene.dispose();
            }
        }
    }, [reactCanvas])

    return (
        <div id="renderOuter">
            <canvas ref={reactCanvas} {...rest} id='renderCanvas'></canvas>
        </div>
    );
}