"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth || 500;
    const h = mount.clientHeight || 500;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 5;

    // ── Shirt geometry (simplified T-shape via merged box meshes) ──────────
    const green = new THREE.Color(0x4caf50);

    // Main body
    const bodyGeo = new THREE.BoxGeometry(2.2, 2.6, 0.12);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = -0.3;
    scene.add(body);

    // Left sleeve
    const sleeveL = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.65, 0.12),
      bodyMat
    );
    sleeveL.position.set(-1.55, 0.9, 0);
    sleeveL.rotation.z = 0.28;
    scene.add(sleeveL);

    // Right sleeve
    const sleeveR = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.65, 0.12),
      bodyMat
    );
    sleeveR.position.set(1.55, 0.9, 0);
    sleeveR.rotation.z = -0.28;
    scene.add(sleeveR);

    // Neck cutout illusion — dark oval
    const neckGeo = new THREE.CircleGeometry(0.35, 32);
    const neckMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
    const neck = new THREE.Mesh(neckGeo, neckMat);
    neck.position.set(0, 1.1, 0.07);
    scene.add(neck);

    // Glowing green design on shirt (eye logo shape)
    const designGeo = new THREE.TorusGeometry(0.35, 0.04, 8, 40, Math.PI);
    const designMat = new THREE.MeshBasicMaterial({ color: green });
    const designTop = new THREE.Mesh(designGeo, designMat);
    designTop.position.set(0, -0.15, 0.075);
    scene.add(designTop);
    const designBot = new THREE.Mesh(designGeo, designMat);
    designBot.rotation.x = Math.PI;
    designBot.position.set(0, -0.15, 0.075);
    scene.add(designBot);

    const pupilGeo = new THREE.CircleGeometry(0.13, 32);
    const pupilMat = new THREE.MeshBasicMaterial({ color: green });
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.set(0, -0.15, 0.078);
    scene.add(pupil);

    // Shirt edges — green wireframe outline
    const edgeMat = new THREE.LineBasicMaterial({ color: green, linewidth: 1 });
    const bodyEdges = new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo), edgeMat);
    bodyEdges.position.copy(body.position);
    scene.add(bodyEdges);

    // ── Floating particles ────────────────────────────────────────────────
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({
      color: green,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // ── Orbit ring ────────────────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(2.0, 0.012, 6, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x2e7d32, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = 0.4;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.008, 6, 120);
    const ring2 = new THREE.Mesh(ring2Geo, new THREE.MeshBasicMaterial({ color: 0x1b5e20, transparent: true, opacity: 0.3 }));
    ring2.rotation.x = -0.3;
    ring2.rotation.y = 0.6;
    scene.add(ring2);

    // ── Lights ────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x4caf50, 3, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0x81c784, 2, 8);
    pointLight2.position.set(-3, -1, 2);
    scene.add(pointLight2);

    // ── Mouse tracking ────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ── Animation loop ────────────────────────────────────────────────────
    let frameId: number;
    const shirtGroup = new THREE.Group();
    shirtGroup.add(body, sleeveL, sleeveR, neck, designTop, designBot, pupil, bodyEdges);
    scene.remove(body, sleeveL, sleeveR, neck, designTop, designBot, pupil, bodyEdges);
    scene.add(shirtGroup);

    const startTime = performance.now();
    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      // Gentle shirt float + mouse parallax
      shirtGroup.rotation.y = mouse.x * 0.3 + Math.sin(t * 0.5) * 0.08;
      shirtGroup.rotation.x = mouse.y * 0.15 + Math.cos(t * 0.4) * 0.04;
      shirtGroup.position.y = Math.sin(t * 0.6) * 0.12;

      // Rotate rings
      ring.rotation.z = t * 0.18;
      ring2.rotation.z = -t * 0.13;

      // Particles drift
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.025;

      // Pulse design glow
      const pulse = 0.6 + Math.sin(t * 2) * 0.4;
      (designMat as THREE.MeshBasicMaterial).opacity = pulse;
      (pupilMat as THREE.MeshBasicMaterial).opacity = pulse;

      renderer.render(scene, camera);
    }
    animate();

    // ── Resize handler ────────────────────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", minHeight: 460, position: "relative" }}
    />
  );
}
