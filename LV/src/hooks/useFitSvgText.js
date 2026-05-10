// src/hooks/useFitSvgText.js
import { useState, useEffect, useRef } from 'react';

/**
 * Хук для автоматического уменьшения размера текста в SVG-компоненте
 * Точный подбор размера на основе измерения SVG текста
 * 
 * @param {string} text - Текст для отображения
 * @param {number} maxWidth - Максимальная доступная ширина
 * @param {number} maxHeight - Максимальная доступная высота
 * @param {Object} options - Опции
 * @param {number} options.maxFontSize - Максимальный размер шрифта
 * @param {number} options.minFontSize - Минимальный размер шрифта
 * @param {number} options.initialFontSize - Начальный размер шрифта для измерения
 * @param {string} options.fontFamily - Шрифт для измерения
 * @returns {number} fontSize - Оптимальный размер шрифта
 */
export function useFitSvgText(
    text,
    maxWidth,
    maxHeight,
    {
        maxFontSize = 14,
        minFontSize = 8,
        initialFontSize = 14,
        fontFamily = 'Arial, sans-serif'
    } = {}
) {
    const [fontSize, setFontSize] = useState(maxFontSize);
    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current || !text) {
            setFontSize(maxFontSize);
            return;
        }

        const svg = svgRef.current;
        
        // Создаем временный текстовый элемент для измерения
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('font-family', fontFamily);
        textElement.setAttribute('font-size', `${initialFontSize}px`);
        textElement.textContent = text;
        
        // Добавляем во временный SVG для измерения
        svg.appendChild(textElement);
        
        let currentFontSize = initialFontSize;
        let width = textElement.getBBox().width;
        let height = textElement.getBBox().height;
        
        // Удаляем временный элемент
        svg.removeChild(textElement);
        
        // Коэффициент для учета наклона параллелограмма
        const widthBuffer = 0.7; // 30% запаса по ширине
        const heightBuffer = 0.8; // 20% запаса по высоте
        
        const availableWidth = maxWidth * widthBuffer;
        const availableHeight = maxHeight * heightBuffer;
        
        // Уменьшаем шрифт, пока текст не поместится
        while (
            (width > availableWidth || height > availableHeight) && 
            currentFontSize > minFontSize
        ) {
            currentFontSize -= 0.5;
            
            // Обновляем размер шрифта для измерения
            textElement.setAttribute('font-size', `${currentFontSize}px`);
            svg.appendChild(textElement);
            width = textElement.getBBox().width;
            height = textElement.getBBox().height;
            svg.removeChild(textElement);
        }
        
        // Округляем до четного значения
        const finalSize = Math.max(Math.round(currentFontSize * 2) / 2, minFontSize);
        setFontSize(finalSize);
        
    }, [text, maxWidth, maxHeight, maxFontSize, minFontSize, initialFontSize, fontFamily]);

    // Возвращаем только fontSize, так как SVG создается и удаляется внутри хука
    return { fontSize };
}