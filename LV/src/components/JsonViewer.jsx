// src/components/JsonViewer.jsx
import React, { useState, useCallback, useMemo, useRef } from 'react';

const JsonViewer = ({ dataJson, depth = 0, searchQuery = '' }) => {
    const [isCollapsed, setIsCollapsed] = useState(depth >= 2);
    const elementRef = useRef(null);

    // Обработчик для предотвращения прокрутки родителя
    const handleWheel = (e) => {
        e.stopPropagation(); // Останавливаем всплытие события
    };

    // Рекурсивный поиск по JSON
    const findMatches = useCallback((data, query) => {
        const matches = [];
        
        if (!query) return matches;
        
        const searchInValue = (value, path) => {
            if (value === null || typeof value !== 'object') {
                const stringValue = typeof value === 'string' ? value : String(value);
                if (stringValue.toLowerCase().includes(query.toLowerCase())) {
                    matches.push({ path, type: 'value', value: stringValue });
                }
            } else {
                Object.keys(value).forEach(key => {
                    const currentPath = path ? `${path}.${key}` : key;
                    
                    // Поиск в ключе
                    if (key.toLowerCase().includes(query.toLowerCase())) {
                        matches.push({ path: currentPath, type: 'key', value: key });
                    }
                    
                    // Поиск в значении
                    searchInValue(value[key], currentPath);
                });
            }
        };
        
        searchInValue(data, '');
        return matches;
    }, []);

    // Поиск совпадений для текущего уровня
    const matches = useMemo(() => {
        return findMatches(dataJson, searchQuery);
    }, [dataJson, searchQuery, findMatches]);

    // Проверка, содержит ли текущий узел совпадение
    const containsMatch = useMemo(() => {
        return matches.some(match => 
            match.path === (depth === 0 ? '' : '') || 
            match.path.startsWith(depth === 0 ? '' : '')
        );
    }, [matches, depth]);

    // Автоматическое раскрытие, если есть совпадения внутри
    const shouldAutoExpand = containsMatch || searchQuery === '';

    // Принудительное отображение только если есть совпадения внутри и компонент не свернут пользователем
    const isExpanded = shouldAutoExpand && !isCollapsed;

    // Подсветка текста
    const highlightText = (text, isKey = false) => {
        if (!searchQuery) return text;
        
        const regex = new RegExp(`(${searchQuery})`, 'gi');
        const parts = text.split(regex);
        
        return parts.map((part, i) => 
            regex.test(part) ? 
                <span key={i} style={{
                    backgroundColor: isKey ? '#ffcc00' : '#a5e075',
                    padding: '1px 2px',
                    borderRadius: '2px'
                }}>
                    {part}
                </span> : 
                part
        );
    };

    if (dataJson === null || typeof dataJson !== 'object') {
        const displayValue = typeof dataJson === 'string' ? `"${dataJson}"` : String(dataJson);
        return (
            <span style={{ color: '#ce9178' }}>
                {searchQuery ? highlightText(displayValue) : displayValue}
            </span>
        );
    }

    const isArray = Array.isArray(dataJson);
    const keys = Object.keys(dataJson);

    // Проверка, нужно ли подсвечивать текущий объект/массив
    const shouldHighlight = matches.some(match => 
        match.path === '' ||
        (depth === 0 && match.path.includes('.')) ||
        match.path === keys[0] // простая проверка для корневого уровня
    );

    return (
        <div 
            ref={elementRef}
            style={{ 
                marginLeft: depth === 0 ? '0px' : '20px',
                backgroundColor: shouldHighlight ? 'rgba(165, 224, 117, 0.2)' : 'transparent',
                padding: shouldHighlight ? '2px' : '0',
                borderRadius: '2px'
            }}
            onTransitionEnd={() => {
                // Плавная прокрутка к элементу при первом отображении
                if (shouldHighlight && elementRef.current) {
                    setTimeout(() => {
                        elementRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 100);
                }
            }}>
            <span
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                    cursor: 'pointer',
                    color: '#569cd6',
                    userSelect: 'none',
                    fontWeight: containsMatch ? 'bold' : 'normal'
                }}
            >
                {isCollapsed ? '▶' : '▼'} {isArray ? '[' : '{'}
                {isCollapsed && keys.length > 0 && ` ${keys.length} ${isArray ? 'items' : 'keys'}`}
                {containsMatch && !isExpanded && <span style={{ color: '#ffcc00', marginLeft: '5px' }}>●</span>}
            </span>

            {isExpanded && (
                <div style={{ 
                    marginLeft: '20px',
                    transition: 'opacity 0.3s ease'
                }}>
                    {keys.map((key, index) => (
                        <div key={key}>
                            <span style={{ color: '#9cdcfe' }}>"{highlightText(key, true)}"</span>
                            <span style={{ color: '#d4d4d4' }}>: </span>
                            <JsonViewer
                                dataJson={dataJson[key]}
                                depth={depth + 1}
                                searchQuery={searchQuery}
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

// Обертка с интерфейсом поиска
const SearchableJsonViewer = ({ dataJson }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Подсчет результатов
    const resultCount = useMemo(() => {
        if (!searchQuery) return 0;
        
        let count = 0;
        const searchInData = (data) => {
            if (data === null || typeof data !== 'object') {
                const stringValue = typeof data === 'string' ? data : String(data);
                if (stringValue.toLowerCase().includes(searchQuery.toLowerCase())) {
                    count++;
                }
            } else {
                Object.keys(data).forEach(key => {
                    if (key.toLowerCase().includes(searchQuery.toLowerCase())) {
                        count++;
                    }
                    searchInData(data[key]);
                });
            }
        };
        searchInData(dataJson);
        return count;
    }, [dataJson, searchQuery]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setIsSearching(true);
            // Даем время на рендеринг и скролл
            setTimeout(() => setIsSearching(false), 300);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
            <div style={{ 
                display: 'flex', 
                marginBottom: '10px', 
                padding: '8px', 
                backgroundColor: '#2d2d2d', 
                borderRadius: '4px' 
            }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Поиск по JSON..."
                    style={{
                        flex: 1,
                        padding: '5px 10px',
                        border: '1px solid #555',
                        borderRadius: '4px',
                        backgroundColor: '#1e1e1e',
                        color: '#d4d4d4'
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        marginLeft: '8px',
                        padding: '5px 12px',
                        backgroundColor: '#007acc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Поиск
                </button>
            </div>
            
            {searchQuery && resultCount === 0 && !isSearching && (
                <div style={{
                    color: '#ff6b6b',
                    fontSize: '12px',
                    marginBottom: '8px',
                    padding: '4px 8px',
                    backgroundColor: '#332222',
                    borderRadius: '3px'
                }}>
                    Ничего не найдено
                </div>
            )}
            
            {searchQuery && resultCount > 0 && !isSearching && (
                <div style={{
                    color: '#a5e075',
                    fontSize: '12px',
                    marginBottom: '8px',
                    padding: '4px 8px',
                    backgroundColor: '#223322',
                    borderRadius: '3px'
                }}>
                    Найдено {resultCount} {resultCount === 1 ? 'совпадение' : 'совпадения'}
                </div>
            )}
            
            <JsonViewer dataJson={dataJson} searchQuery={searchQuery} />
        </div>
    );
};

export default SearchableJsonViewer;