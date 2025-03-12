'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Three.jsシーンのセットアップ
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // 既に子要素がある場合は削除
        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

        containerRef.current.appendChild(renderer.domElement);

        // 星のジオメトリを作成
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.7,
            transparent: true,
        });

        // 星の数
        const starsCount = 1500;
        const positions = new Float32Array(starsCount * 3);
        const opacities = new Float32Array(starsCount);
        const sizes = new Float32Array(starsCount);

        // 星をランダムな位置に配置
        for (let i = 0; i < starsCount; i++) {
            // 画面奥行きの星を配置（z軸の値を調整）
            positions[i * 3] = (Math.random() - 0.5) * 100; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
            positions[i * 3 + 2] = Math.random() * 50 - 25; // z

            // ランダムな透明度と大きさ
            opacities[i] = Math.random();
            sizes[i] = Math.random() * 2;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // 星のポイントを作成
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // カメラの位置調整
        camera.position.z = 20;

        // リサイズハンドラ
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // アニメーションループ
        const animate = () => {
            requestAnimationFrame(animate);

            // 星をゆっくり回転
            stars.rotation.x += 0.0001;
            stars.rotation.y += 0.0002;

            // マウス位置に応じた視差効果
            const mouseX = 0;
            const mouseY = 0;
            stars.rotation.x += (mouseY * 0.00005 - stars.rotation.x) * 0.05;
            stars.rotation.y += (mouseX * 0.00005 - stars.rotation.y) * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // クリーンアップ
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

    return <div ref={containerRef} className="star-bg" />;
};

export default StarBackground;