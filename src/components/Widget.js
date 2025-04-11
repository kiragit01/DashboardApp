// src/components/Widget.js
import React, { useState, useEffect, useRef } from 'react';

const Widget = ({ title, content, type, isEditing, onRemove }) => {
    const [isHovered, setIsHovered] = useState(false);
    const contentRef = useRef(null);
    const [contentVisible, setContentVisible] = useState(true);
    const [containerHeight, setContainerHeight] = useState('auto');

    // Обработчик удаления с предотвращением всплытия события
    const handleRemove = (e) => {
        e.stopPropagation();
        onRemove();
    };
    
    // Отслеживаем изменение размера контейнера для адаптации контента
    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const height = entry.contentRect.height;
                // Скрываем контент, если виджет слишком маленький (менее 150px высотой)
                if (height < 150 && type === 'list') {
                    setContentVisible(false);
                } else {
                    setContentVisible(true);
                }
                
                // Устанавливаем высоту контейнера контента
                setContainerHeight(`${height - 70}px`); // 70px примерно для заголовка и отступов
            }
        });
        
        const widgetElement = contentRef.current?.closest('.react-grid-item');
        if (widgetElement) {
            observer.observe(widgetElement);
        }
        
        return () => {
            if (widgetElement) observer.unobserve(widgetElement);
        };
    }, [type]);

    // Отображаем разный контент в зависимости от типа виджета
    const renderWidgetContent = () => {
        if (!contentVisible) {
            return <div className="text-xs text-gray-400 text-center italic">Content hidden (resize to view)</div>;
        }
        
        switch (type) {
            case 'chart':
                return (
                    <div className="flex justify-center items-center bg-gray-100 rounded w-full h-full">
                        <div className="p-2 text-center">
                            <p className="text-gray-600 mb-2">{content}</p>
                            <div className="bg-blue-50 p-2 rounded">
                                <div className="w-full bg-blue-200 h-8 rounded mb-2"></div>
                                <div className="w-3/4 bg-blue-300 h-8 rounded mb-2"></div>
                                <div className="w-1/2 bg-blue-400 h-8 rounded"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'list':
                return (
                    <div className="bg-gray-100 rounded w-full h-full p-2 overflow-auto">
                        <p className="text-gray-600 mb-2">{content}</p>
                        <ul className="space-y-1">
                            <li className="bg-white p-2 rounded shadow-sm">Item 1</li>
                            <li className="bg-white p-2 rounded shadow-sm">Item 2</li>
                            <li className="bg-white p-2 rounded shadow-sm">Item 3</li>
                        </ul>
                    </div>
                );
            default:
                return (
                    <div className="flex justify-center items-center bg-gray-100 rounded w-full h-full">
                        <span className="text-gray-400">Widget Content</span>
                    </div>
                );
        }
    };

    return (
        <div
            ref={contentRef}
            className="h-full w-full p-4 relative select-none flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isEditing && isHovered && (
                <button
                    onClick={handleRemove}
                    className="widget-remove-btn absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 z-10"
                    aria-label="Remove widget"
                >
                    x
                </button>
            )}
            
            <div className="border-b pb-2 mb-2 flex-shrink-0">
                <h3 className="font-bold text-lg text-gray-800">{title}</h3>
            </div>
            
            <div className="flex-grow overflow-hidden" style={{ height: containerHeight }}>
                {renderWidgetContent()}
            </div>
        </div>
    );
};

export default Widget;