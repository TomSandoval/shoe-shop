"use client";

import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Shoe3D() {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Data from the canvas

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    let angle = -5;
    const radius = 5;

    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;
    
    //Scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
    camera.zoom = 1.2;
    scene.add(camera);
    camera.position.set(0, 0, 0);

    camera.lookAt(new THREE.Vector3());

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //OrbitControls
    // const orbitControls = new OrbitControls(camera, renderer.domElement);
    // orbitControls.enableDamping = true;

    //Resize canvas
    const resize = () => {
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

    //Loader
    const gtlfLoader = new GLTFLoader();

    gtlfLoader.load(
      "./assets/nike.glb",
      (gltf) => {
        const model = gltf.scene;
        model.rotation.set(-0.7, 0.3, 0.3);
        model.position.y = 0.03;
        scene.add(model);
        setLoading(true)

        const onMouseDown = (event) => {
          isDragging = true;
          previousMousePosition = { x: event.clientX, y: event.clientY };
        };

        const onMouseMove = (event) => {
          if (isDragging) {
            const deltaMove = {
              x: event.clientX - previousMousePosition.x,
              y: event.clientY - previousMousePosition.y,
            };
            angle += deltaMove.x * 0.01;
            previousMousePosition = { x: event.clientX, y: event.clientY };
          }
        };

        const onMouseUp = (event) => {
          isDragging = false;
        };

        renderer.domElement.addEventListener("mousedown", onMouseDown);
        renderer.domElement.addEventListener("mousemove", onMouseMove);
        renderer.domElement.addEventListener("mouseup", onMouseUp);
        renderer.domElement.addEventListener("mouseleave", onMouseUp);
      },
      () => {
        return (
          <div style={{ width: "100%", height: "100%" }}>
            <span>Loading</span>
          </div>
        );
      },
      (error) => {
        console.log(error);
      }
    );

    //Animate the scene
    const animate = () => {
      const updateCameraPosition = () => {
        camera.position.x = radius * Math.sin(angle);
        camera.position.z = radius * Math.cos(angle);
        camera.lookAt(new THREE.Vector3());
        angle -= 0.01;
      };
      updateCameraPosition();
      // orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    return () => {
      window.removeEventListener("resize", resize);
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
      </div>
  );
}
