// CustomParallelogramNode.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';

const CustomParallelogramNode = memo(({ data, selected }) => {
    const width = 120;
    const height = 60;
    const skew = 20; // Соответствует компоненту Call
    const [fontSize, setFontSize] = useState(14); // Начальный размер шрифта
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        const originalFontSize = 14;
        let currentSize = originalFontSize;

        // Создаем временный SVG элемент для измерения текста
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        
        // Настраиваем текстовый элемент
        textElement.setAttribute('font-family', 'Arial, sans-serif');
        textElement.setAttribute('font-size', `${originalFontSize}px`);
        textElement.textContent = data.label || 'Узел';
        
        // Добавляем во временный SVG
        svg.appendChild(textElement);
        document.body.appendChild(svg);
        
        // Получаем размеры текста
        const textBBox = textElement.getBBox();
        const textWidth = textBBox.width;
        const textHeight = textBBox.height;
        
        // Удаляем временный SVG
        document.body.removeChild(svg);
        
        // Максимальная доступная ширина с учетом наклона параллелограмма
        const maxContentWidth = width * 0.7; // Уменьшенный коэффициент для учета наклона
        const maxContentHeight = height * 0.7;
        
        // Уменьшаем шрифт, пока текст не поместится
        while (
            (textWidth > maxContentWidth || textHeight > maxContentHeight) && 
            currentSize > 8
        ) {
            currentSize -= 0.5;
            
            // Обновляем размер шрифта для измерения
            textElement.setAttribute('font-size', `${currentSize}px`);
            const newBBox = textElement.getBBox();
            if (newBBox.width <= maxContentWidth && newBBox.height <= maxContentHeight) {
                break;
            }
        }
        
        setFontSize(currentSize);
    }, [data.label, width, height]);

    return (
        <div style={{ position: 'relative' }}>
            <button style={{position: "absolute", padding: "0", margin: "0", border: "none", left: "80%", background: "transparent"}}>ℹ️</button>
            <svg
                width={width}
                height={height}
                style={{ display: 'block' }}
            >
                {/* Параллелограмм с единой толщиной границы */}
                <polygon
                    points={`
                      ${skew},0 
                      ${width},0 
                      ${width - skew},${height} 
                      0,${height}
                    `}
                    fill={data.bgColor || '#f0f0f0'}
                    stroke={data.borderColor || '#333'}
                    strokeWidth={2}
                    strokeLinejoin="miter"
                    vectorEffect="non-scaling-stroke"
                />

                {/* Текст */}
                <text
                    ref={textRef}
                    x={width / 2}
                    y={height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#000"
                    fontSize={fontSize}
                >
                    {data.label || 'Узел'}
                </text>
            </svg>

            {/* Верхняя ручка - строго по центру сверху */}
            <Handle
                type="target"
                position={Position.Top}
                style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: -3,
                    background: '#fff',
                    border: '1px solid #000',
                    width: 6,
                    height: 6,
                    borderRadius: '50%'
                }}
            />

            {/* Нижняя ручка - строго по центру снизу */}
            <Handle
                type="source"
                position={Position.Bottom}
                style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: -3,
                    background: '#fff',
                    border: '1px solid #000',
                    width: 6,
                    height: 6,
                    borderRadius: '50%'
                }}
            />
        </div>
    );
});

export default CustomParallelogramNode;