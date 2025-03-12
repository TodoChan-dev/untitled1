'use client';

import { useEffect, useState } from 'react';

export function StarParticles() {
    const [stars, setStars] = useState<Array<{id: number, top: string, left: string, delay: string}>>([]);

    useEffect(() => {
        // クライアントサイドでのみ実行され、ランダムな星の位置を生成
        const newStars = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 3}s`
        }));
        setStars(newStars);
    }, []);

    return (
        <>
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute w-1 h-1 bg-primary-300 rounded-full animate-pulse-glow"
                    style={{
                        top: star.top,
                        left: star.left,
                        animationDelay: star.delay
                    }}
                />
            ))}
        </>
    );
}