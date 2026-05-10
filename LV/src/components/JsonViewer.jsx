// src/components/JsonViewer.jsx
import React, { useState } from 'react';

const JsonViewer = ({ data, depth = 0 }) => {
    const [isCollapsed, setIsCollapsed] = useState(depth >= 2);

    // Обработчик для предотвращения прокрутки родителя
    const handleWheel = (e) => {
        e.stopPropagation(); // Останавливаем всплытие события
    };

    if (data === null || typeof data !== 'object') {
        return (
            <span style={{ color: '#ce9178' }}>
                {typeof data === 'string' ? `"${data}"` : String(data)}
            </span>
        );
    }

    const isArray = Array.isArray(data);
    const keys = Object.keys(data);

    return (
        <div style={{ marginLeft: depth === 0 ? '0px' : '20px' }}>
            <span
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                    cursor: 'pointer',
                    color: '#569cd6',
                    userSelect: 'none'
                }}
            >
                {isCollapsed ? '▶' : '▼'} {isArray ? '[' : '{'}
                {isCollapsed && keys.length > 0 && ` ${keys.length} ${isArray ? 'items' : 'keys'}`}
            </span>

            {!isCollapsed && (
                <div style={{ marginLeft: '20px' }}>
                    {keys.map((key, index) => (
                        <div key={key}>
                            <span style={{ color: '#9cdcfe' }}>"{key}"</span>
                            <span style={{ color: '#d4d4d4' }}>: </span>
                            <JsonViewer
                                data={data[key]}
                                depth={depth + 1}
                            />
                            {index < keys.length - 1 && <span style={{ color: '#d4d4d4' }}>,</span>}
                        </div>
                    ))}
                </div>
            )}

            <span style={{ color: '#d4d4d4' }}>{isArray ? ']' : '}'}</span>
        </div>
    );
};

export default JsonViewer;