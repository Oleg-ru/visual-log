import React, { useRef, useEffect } from 'react';

const InfoModal = ({ children, isVisible, onClose, viewerType = 'json', leftOffset = '260%' }) => {
    const scrollContainerRef = useRef(null);

    // Обработчик прокрутки
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || !isVisible) return;

        const handleWheel = (e) => {
            e.stopPropagation();
            container.scrollTop += e.deltaY;
            e.preventDefault();
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'absolute',
                top: '0',
                left: leftOffset,
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
            }}
        >
            <div style={{ display: "flex", justifyContent: "right", padding: '4px' }}>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    ❌
                </button>
            </div>
            <div
                ref={scrollContainerRef}
                style={{
                    padding: '12px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#d4d4d4',
                    backgroundColor: '#1e1e1e',
                    maxHeight: '360px',
                    overflowY: 'auto',
                    overflowX: 'auto'
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default InfoModal;