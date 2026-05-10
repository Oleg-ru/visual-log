
import React, { useState, useRef, useEffect } from 'react';
import './Call.css';
import { Handle } from '@xyflow/react';
import { useFitText } from '../../hooks/useFitText';
import JsonViewer from '../JsonViewer';

export default function Call({ data }) {
    const [showInfo, setShowInfo] = useState(false);
    const { text = 'Вызов', jsonData = null } = data;
    const width = 120;
    const height = 60;
    const skew = 20;
    const handleSize = 6;
    const scrollContainerRef = useRef(null);

    const { fontSize, ref: textRef } = useFitText(
        text,
        width,
        height,
        {
            maxFontSize: 12,
            minFontSize: 6,
            widthRatio: 0.8,
            heightRatio: 0.7
        }
    );

    // Обработчик прокрутки
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.stopPropagation();

            // Прокручиваем внутренний контейнер
            container.scrollTop += e.deltaY;

            // Предотвращаем прокрутку страницы/холста
            e.preventDefault();
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [showInfo]); // Пересоздаем эффект при открытии/закрытии
    const closeJson = () => {
        setShowInfo(false)
    };
    return (
        <div
            className="parallelogram-container"
            style={{ width, height, position: 'relative' }}
        >
            <button
                style={{
                    position: "absolute",
                    top: "0",
                    left: "85%",
                    zIndex: "3",
                    border: "none",
                    background: "none",
                    cursor: "pointer"
                }}
                onClick={() => setShowInfo(!showInfo)}
            >
                ℹ️
            </button>

            {showInfo && (
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '260%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #3c3c3c',
                    borderRadius: '6px',
                    padding: '0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 10,
                    minWidth: '300px',
                    maxWidth: '500px',
                    maxHeight: '400px',
                }}>
                    <div style={{display: "flex", justifyContent: "right"}}>
                        <button style={{}} onClick={closeJson}>❌</button>
                    </div>
                    <div
                        ref={scrollContainerRef}
                        style={{
                            padding: '12px',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            color: '#d4d4d4',
                            backgroundColor: '#1e1e1e',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            overflowX: 'auto'
                        }}
                    >
                        {jsonData ? (
                            <JsonViewer dataJson={jsonData} />
                        ) : (
                            <div style={{ color: '#f8f8f2' }}>
                                Нет данных
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Параллелограмм */}
            <div
                className="parallelogram"
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: '#a5cfef',
                    border: '1px solid #000',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: `skewX(-${skew}deg)`,
                    zIndex: 1,
                }}
            />

            {/* Контент с динамическим шрифтом */}
            <div
                className="content"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) skewX(${skew}deg)`,
                    zIndex: 2,
                    pointerEvents: 'none',
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                <span
                    ref={textRef}
                    style={{
                        transform: 'skewX(-20deg)',
                        whiteSpace: 'nowrap',
                        fontSize: `${fontSize}px`,
                        fontWeight: 'normal',
                        display: 'inline-block',
                    }}
                >
                    {text}
                </span>
            </div>

            {/* Handle сверху */}
            <div
                className="handle-wrapper target"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: `-${handleSize / 2}px`,
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

            {/* Handle снизу */}
            <div
                className="handle-wrapper source"
                style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: `-${handleSize / 2 + 3}px`,
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