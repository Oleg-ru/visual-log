import React, { useRef, useEffect } from 'react';
import './InfoModal.css'

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
            style={{left: leftOffset}}
            className="modal-container"
        >
            <div className="modal-btn-container">
                <button
                    onClick={onClose}
                    className="modal-close-btn"
                >
                    ❌
                </button>
            </div>
            <div
                ref={scrollContainerRef}
                className="modal-content"
            >
                {children}
            </div>
        </div>
    );
};

export default InfoModal;