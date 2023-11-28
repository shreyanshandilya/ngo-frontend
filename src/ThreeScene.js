// ThreeBackground.js
import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Create NGO logo using shapes
    const logo = new THREE.Group();

    // Circle
    const circleGeometry = new THREE.CircleGeometry(5, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x3498db, opacity: 0.8, transparent: true });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    logo.add(circle);

    // Triangle
    const triangleGeometry = new THREE.TriangleGeometry(4, 4);
    const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, opacity: 0.8, transparent: true });
    const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
    triangle.position.set(0, 6, 0);
    logo.add(triangle);

    scene.add(logo);

    // Set background color to a light blue
    scene.background = new THREE.Color(0x87CEEB);

    // Set camera position
    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the logo
      logo.rotation.z += 0.005;

      // Make the logo pulse
      const scaleValue = 1 + 0.1 * Math.sin(Date.now() * 0.001);
      logo.scale.set(scaleValue, scaleValue, scaleValue);

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up Three.js resources on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(logo);
      renderer.domElement.remove();
    };
  }, []);

  return <div id="three-container" className="three-container" />;
};

export default ThreeBackground;
