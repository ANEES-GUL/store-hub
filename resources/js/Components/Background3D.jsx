import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mount.appendChild(renderer.domElement);

        // 1. Subtle Deep Wireframe Grid
        const geometry = new THREE.PlaneGeometry(90, 90, 50, 50);
        const material = new THREE.MeshBasicMaterial({
            color: 0x6366f1, // Soft indigo wireframe
            wireframe: true,
            transparent: true,
            opacity: 0.12, // Balanced: clearly visible yet non-intrusive
        });

        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2.1;
        plane.position.y = -4.2;
        scene.add(plane);

        // 2. Soft Ambient Floating Stars
        const particleCount = 150;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 25;
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMat = new THREE.PointsMaterial({
            color: 0x38bdf8, // Soft cyan stars
            size: 0.04,
            transparent: true,
            opacity: 0.5,
        });

        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        camera.position.z = 7;

        let clock = new THREE.Clock();
        let animationFrameId;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Gentle wave motion
            const pos = geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const z = Math.sin(elapsedTime * 1.2 + i * 0.15) * 0.15;
                pos.setZ(i, z);
            }
            pos.needsUpdate = true;

            particles.rotation.y = elapsedTime * 0.015;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 bg-slate-950 overflow-hidden">
            {/* Rich, balanced gradient background base */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>

            {/* Controlled, elegant glowing ambient lights (Not too bright, not invisible) */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
            
            {/* 3D Canvas Mount */}
            <div ref={mountRef} className="absolute inset-0" />
        </div>
    );
}