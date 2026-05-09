// src/components/Examination/Examination.jsx
import React from 'react';
import './Examination.css';
import { Handle } from '@xyflow/react';

export default function Examination({ data }) {
    const { text = 'Проверка' } = data;
    const diamondSize = 80;
    const handleSize = 6;

    return (
        <div className="diamond-container" style={{ width: diamondSize, height: diamondSize }}>
            {/* Верхний треугольник */}
            <div 
                className="triangle top"
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: `${diamondSize/2}px solid transparent`,
                    borderRight: `${diamondSize/2}px solid transparent`,
                    borderBottom: `${diamondSize/2}px solid #a5cfef`,
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            />
            
            {/* Нижний треугольник */}
            <div 
                className="triangle bottom"
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: `${diamondSize/2}px solid transparent`,
                    borderRight: `${diamondSize/2}px solid transparent`,
                    borderTop: `${diamondSize/2}px solid #a5cfef`,
                    position: 'absolute',
                    bottom: 0,
                    left: 0
                }}
            />
            
            {/* Левый треугольник */}
            <div 
                className="triangle left"
                style={{
                    width: 0,
                    height: 0,
                    borderTop: `${diamondSize/2}px solid transparent`,
                    borderBottom: `${diamondSize/2}px solid transparent`,
                    borderRight: `${diamondSize/2}px solid #a5cfef`,
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            />
            
            {/* Правый треугольник */}
            <div 
                className="triangle right"
                style={{
                    width: 0,
                    height: 0,
                    borderTop: `${diamondSize/2}px solid transparent`,
                    borderBottom: `${diamondSize/2}px solid transparent`,
                    borderLeft: `${diamondSize/2}px solid #a5cfef`,
                    position: 'absolute',
                    top: 0,
                    right: 0
                }}
            />
            
            {/* Центральный квадрат для заливки */}
            <div
                style={{
                    position: 'absolute',
                    top: `${diamondSize/4}px`,
                    left: `${diamondSize/4}px`,
                    width: `${diamondSize/2}px`,
                    height: `${diamondSize/2}px`,
                    backgroundColor: '#a5cfef',
                    zIndex: 1
                }}
            />
            
            {/* Контент внутри ромба */}
            <div className="diamond-content" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                pointerEvents: 'none'
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
                        borderRadius: '50%',
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
                    bottom: `-${handleSize/2}px`,
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