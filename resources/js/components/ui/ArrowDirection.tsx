import React, { useState, useEffect } from 'react';

const ArrowDirection = () => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const handleOrientation = (event: DeviceOrientationEvent) => {
            if (event.alpha !== null) {
                // alpha: 地磁気方向に対する回転角度（0が北方向）
                setRotation(event.alpha);
            }
        };

        // デバイスの方向センサーを監視
        window.addEventListener('deviceorientation', handleOrientation);

        // クリーンアップ
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    return (
        <div
            style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'red',
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.2s ease-in-out', // なめらかに回転
                margin: 'auto',
                marginTop: '50vh',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformOrigin: 'center center',
            }}
        />
    );
};

export default ArrowDirection;
