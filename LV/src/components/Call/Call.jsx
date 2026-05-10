import React, { useState, useRef, useEffect } from 'react';
import './Call.css';
import { Handle } from '@xyflow/react';
import { useFitText } from '../../hooks/useFitText';
import JsonViewer from '../JsonViewer';
import InfoModal from '../InfoModal/InfoModal';
import SearchableJsonViewer from "../JsonViewer";

export default function Call({ data }) {
    const [showInfo, setShowInfo] = useState(false);
    const { text = 'Вызов', jsonData = null } = data;
    const width = 120;
    const height = 60;
    const skew = 20;
    const handleSize = 6;

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

    const closeJson = () => {
        setShowInfo(false);
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

            <InfoModal
                isVisible={showInfo}
                onClose={closeJson}
                viewerType="json"
                leftOffset="260%"  // можно менять на любое значение, например "200%", "300%" и т.д.
            >
                {jsonData ? (
                    <SearchableJsonViewer dataJson={jsonData} />
                ) : (
                    <div style={{ color: '#f8f8f2' }}>
                        Нет данных
                    </div>
                )}
            </InfoModal>

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