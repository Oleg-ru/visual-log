// src/hooks/useFitText.js
import { useState, useEffect, useRef } from 'react';

/**
 * Универсальный хук для автоматического уменьшения размера текста при переполнении контейнера
 * @param {string} text - Текст для отображения
 * @param {number} containerWidth - Ширина контейнера
 * @param {number} containerHeight - Высота контейнера
 * @param {Object} options - Опции
 * @param {number} options.maxFontSize - Максимальный размер шрифта
 * @param {number} options.minFontSize - Минимальный размер шрифта
 * @param {number} options.widthRatio - Коэффициент ширины (для учета скосов и т.п.)
 * @param {number} options.heightRatio - Коэффициент высоты
 * @returns {Object} { fontSize, ref }
 */
export function useFitText(
    text,
    containerWidth,
    containerHeight,
    {
        maxFontSize = 14,
        minFontSize = 8,
        widthRatio = 0.85,
        heightRatio = 0.8
    } = {}
) {
    const [fontSize, setFontSize] = useState(maxFontSize);
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        const measureText = (size) => {
            textRef.current.style.fontSize = `${size}px`;
            return {
                width: textRef.current.offsetWidth,
                height: textRef.current.offsetHeight
            };
        };

        // Начинаем с максимального размера
        let currentSize = maxFontSize;
        const textElement = textRef.current;

        // Сбрасываем стили для корректного измерения
        textElement.style.fontSize = `${maxFontSize}px`;
        textElement.style.whiteSpace = 'nowrap';
        textElement.style.display = 'inline-block';

        // Доступное пространство с учетом коэффициентов
        const availableWidth = containerWidth * widthRatio;
        const availableHeight = containerHeight * heightRatio;

        // Проверяем, помещается ли текст
        let { width, height } = measureText(currentSize);

        // Уменьшаем шрифт, пока текст не поместится
        while (
            (width > availableWidth || height > availableHeight) && 
            currentSize > minFontSize
        ) {
            currentSize -= 0.5;
            ({ width, height } = measureText(currentSize));
        }

        
        setFontSize(currentSize);
        
        // Восстанавливаем оригинальные стили (за исключением размера)
        textElement.style.whiteSpace = 'nowrap';
        textElement.style.display = 'inline-block';
        
    }, [text, containerWidth, containerHeight, maxFontSize, minFontSize, widthRatio, heightRatio]);

    
    return { fontSize, ref: textRef };
}