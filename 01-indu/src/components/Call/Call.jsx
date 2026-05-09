// src/components/Call/Call.jsx
import React from 'react';
import './Call.css';
import { Handle } from '@xyflow/react';

export default function Call({ data }) {
    const { text = 'Вызов' } = data;
    const width = 120;
    const height = 60;
    const skew = 20; // Угол наклона боковых сторон
    const handleSize = 6;

    return (
        <div className="parallelogram-container" style={{ width, height }}>
            {/* Основной параллелограмм */}
            <div 
                className="parallelogram"
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: '#a5cfef',
                    border: '2px solid #000',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: `skewX(-${skew}deg)`,
                }}
            />
            
            {/* Контент внутри параллелограмма */}
            <div className="content" style={{
                position: 'absolute',
                top: '50%',
                left: '0%',
                transform: 'translate(-50%, -50%) skewX(${skew}deg)',
                zIndex: 2,
                pointerEvents: 'none',
                textAlign: 'center',
                width: '100%'
            }}>
                <span style={{
                    whiteSpace: 'nowrap',
                    fontSize: '12px',
                    position: 'relative',
                    zIndex: 2
                }}>{text}</span>
            </div>

            {/* Точка соединения вверху */}
            <div
                className="handle-wrapper target"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: `-${handleSize/2}px`,
                    transform: 'translateX(-50%)',
                    width: handleSize,
                    height: handleSize,
                    borderRadius: '50%',
                    background: '#fff',
                    border: '1px solid #000',
                    zIndex: 10,
                    pointerEvents: 'all',
                }}
            >
                <Handle
                    type="target"
                    position="top"
                    id="top"
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '100%',
                        cursor: 'pointer',
                    }}
                />
            </div>

            {/* Точка соединения внизу */}
            <div
                className="handle-wrapper source"
                style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: `-${handleSize/2 + 4}px`,
                    transform: 'translateX(-50%)',
                    width: handleSize,
                    height: handleSize,
                    borderRadius: '50%',
                    background: '#fff',
                    border: '1px solid #000',
                    zIndex: 10,
                    pointerEvents: 'all',
                }}
            >
                <Handle
                    type="source"
                    position="bottom"
                    id="bottom"
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                    }}
                />
            </div>
        </div>
    );
}