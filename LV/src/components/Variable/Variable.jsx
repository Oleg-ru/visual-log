// src/components/Variable/Variable.jsx
import React from 'react';
import './Variable.css';
import { Handle } from '@xyflow/react';
import { useFitText } from '../../hooks/useFitText';

export default function Variable({ data }) {
    const { text = 'Переменная' } = data;
    const width = 120;
    const height = 40;
    const handleSize = 6;
    
    // Используем хук для подбора размера текста
    const { fontSize, ref: textRef } = useFitText(
        text, 
        width, 
        height,
        { 
            maxFontSize: 14, 
            minFontSize: 8,
            widthRatio: 0.85, // Высокий коэффициент, так как это простой прямоугольник
            heightRatio: 0.8 
        }
    );

    return (
        <div className="variable-container" style={{ width, height }}>
            {/* Основной прямоугольник с скругленными краями */}
            <div 
                className="variable"
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: '#a5cfef', // Светло-синий фон
                    border: '1px solid black', // Синяя обводка
                    borderRadius: '8px', // Слегка скругленные края
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
            
            {/* Контент внутри прямоугольника */}
            <div className="content" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                pointerEvents: 'none',
                textAlign: 'center',
                width: '100%'
            }}>
                <span 
                    ref={textRef}
                    style={{
                        whiteSpace: 'nowrap',
                        fontSize: `${fontSize}px`,
                        position: 'relative',
                        zIndex: 2,
                        display: 'inline-block'
                    }}
                >{text}</span>
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
                    bottom: `-${handleSize/2 + 3}px`,
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