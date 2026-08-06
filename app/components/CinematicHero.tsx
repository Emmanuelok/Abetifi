"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { BufferGeometry, Material } from "three";
import { headlineFacts } from "../lib/content";

export function CinematicHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      mount.dataset.webgl = "reduced-motion";
      return;
    }

    const probeCanvas = document.createElement("canvas");
    const webglContext =
      probeCanvas.getContext("webgl2") ?? probeCanvas.getContext("webgl");
    if (!webglContext) {
      mount.dataset.webgl = "unavailable";
      return;
    }

    let disposed = false;
    let teardown = () => {};

    const initialize = async () => {
      const THREE = await import("three");
      if (disposed) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x10120f, 0.075);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.15, 8.1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const strata = new THREE.Group();
    strata.rotation.x = -0.14;
    scene.add(strata);

    const colors = [
      0xd6a95d, 0xc98942, 0xa55b35, 0x70402d, 0x3e3428, 0x284b3d, 0x5b6c4e,
    ];
    const geometries: BufferGeometry[] = [];
    const materials: Material[] = [];

    for (let index = 0; index < 16; index += 1) {
      const geometry = new THREE.TorusGeometry(
        1.12 + index * 0.115,
        0.065 + index * 0.002,
        12,
        144,
      );
      const positions = geometry.attributes.position;
      for (let vertex = 0; vertex < positions.count; vertex += 1) {
        const x = positions.getX(vertex);
        const y = positions.getY(vertex);
        const angle = Math.atan2(y, x);
        const ripple =
          1 +
          Math.sin(angle * (3 + (index % 4)) + index * 0.73) * 0.025 +
          Math.cos(angle * 7 - index) * 0.009;
        positions.setX(vertex, x * ripple);
        positions.setY(vertex, y * ripple * (0.78 + index * 0.002));
      }
      geometry.computeVertexNormals();
      const material = new THREE.MeshStandardMaterial({
        color: colors[index % colors.length],
        roughness: 0.92,
        metalness: 0.04,
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.position.z = -index * 0.115;
      ring.rotation.z = index * 0.075;
      ring.rotation.x = Math.sin(index * 0.5) * 0.015;
      strata.add(ring);
      geometries.push(geometry);
      materials.push(material);
    }

    const emberGeometry = new THREE.BufferGeometry();
    const emberCount = 150;
    const emberPositions = new Float32Array(emberCount * 3);
    for (let index = 0; index < emberCount; index += 1) {
      const radius = 1.5 + Math.random() * 3.4;
      const angle = Math.random() * Math.PI * 2;
      emberPositions[index * 3] = Math.cos(angle) * radius;
      emberPositions[index * 3 + 1] = Math.sin(angle) * radius * 0.65;
      emberPositions[index * 3 + 2] = -2 + Math.random() * 4;
    }
    emberGeometry.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));
    const emberMaterial = new THREE.PointsMaterial({
      color: 0xf4d89d,
      size: 0.018,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
    });
    const embers = new THREE.Points(emberGeometry, emberMaterial);
    scene.add(embers);
    geometries.push(emberGeometry);
    materials.push(emberMaterial);

    scene.add(new THREE.HemisphereLight(0xf6e6be, 0x13241d, 1.35));
    const keyLight = new THREE.DirectionalLight(0xffc46c, 3.2);
    keyLight.position.set(-3.5, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x77aa86, 18, 15);
    rimLight.position.set(3, -1.2, 2.8);
    scene.add(rimLight);

    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;
    let visible = true;
    const clock = new THREE.Clock();

    const resize = () => {
      const width = mount.clientWidth || 640;
      const height = mount.clientHeight || 640;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(mount);

    const render = () => {
      if (visible) {
        const elapsed = clock.getElapsedTime();
        const targetY = reducedMotion ? -0.16 : pointerX * 0.16 + elapsed * 0.035;
        const targetX = reducedMotion ? -0.14 : -0.14 + pointerY * 0.08;
        strata.rotation.y += (targetY - strata.rotation.y) * 0.035;
        strata.rotation.x += (targetX - strata.rotation.x) * 0.035;
        if (!reducedMotion) {
          strata.position.y = Math.sin(elapsed * 0.42) * 0.06;
          embers.rotation.z = elapsed * 0.018;
          embers.rotation.y = elapsed * -0.025;
        }
        renderer.render(scene, camera);
      }
      frame = window.requestAnimationFrame(render);
    };
    render();

    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", onPointerMove);

    teardown = () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", onPointerMove);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
    };

    const initializeTimer = window.setTimeout(() => {
      void initialize().catch(() => {
        mount.dataset.webgl = "unavailable";
      });
    }, 80);
    return () => {
      disposed = true;
      window.clearTimeout(initializeTimer);
      teardown();
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/abetifi-hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/media/abetifi-hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-topography" aria-hidden="true" />
      <div ref={mountRef} className="hero-canvas" aria-hidden="true" />

      <div className="hero-content page-shell">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span /> Abetifi · Kwahu Plateau · Ghana
          </p>
          <h1 id="hero-title">
            <span>12,000 years</span>
            <span>beneath our feet.</span>
            <em>The next chapter in our hands.</em>
          </h1>
          <p className="hero-deck">
            A living heritage destination connecting Bosumpra’s deep human record with conservation, learning, community enterprise and a new museum vision.
          </p>
          <div className="hero-actions">
            <a href="#deep-time" className="button button-light">
              Enter the story <span aria-hidden="true">↓</span>
            </a>
            <Link href="/project" className="text-link text-link-light">
              Explore the development <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="hero-object-label" aria-hidden="true">
          <span>Interactive strata</span>
          <i />
          <small>Move to explore</small>
        </div>

        <div className="hero-facts" aria-label="Project facts">
          {headlineFacts.map((fact) => (
            <article key={fact.value}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
              <small>{fact.note}</small>
            </article>
          ))}
        </div>
      </div>

      <div className="hero-edge" aria-hidden="true">
        <span>Scroll through deep time</span>
        <i />
      </div>
      <p className="hero-disclosure">
        Interpretive visual inspired by the Kwahu Plateau—not documentary footage of Bosumpra.
      </p>
    </section>
  );
}
