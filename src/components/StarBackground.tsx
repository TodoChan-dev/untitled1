'use client';

import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';

const StarBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Three.jsシーンのセットアップ
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000914);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

        containerRef.current.appendChild(renderer.domElement);

        // 星のジオメトリを作成
        const starGeometry = new THREE.BufferGeometry();
        const colors = [];
        const starMaterial = new THREE.PointsMaterial({
            size: 0.2, // サイズを小さく調整
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true,
            map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/spark1.png'), // 星形のテクスチャ
            alphaTest: 0.5,
        });

        const starsCount = 1500;
        const positions = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
            positions[i * 3 + 2] = Math.random() * 50 - 25; // z

            const colorOptions = [
                new THREE.Color(0xff0000), // 赤
                new THREE.Color(0xff8c00), // 橙
                new THREE.Color(0xffff00), // 黄
                new THREE.Color(0x0000ff), // 青
                new THREE.Color(0x800080)  // 紫
            ];
            const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            colors.push(color.r, color.g, color.b);
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        camera.position.z = 20;

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);

            stars.rotation.x += 0.0001;
            stars.rotation.y += 0.0002;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            scene.remove(stars);
            starGeometry.dispose();
            starMaterial.dispose();
            renderer.dispose();
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} className="star-bg"/>;
};

export default StarBackground;