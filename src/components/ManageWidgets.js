// src/components/ManageWidgets.js
import React from 'react';

const ManageWidgets = ({ widgetList, activeWidgets, onWidgetToggle }) => {
    // Получить текстовое представление типа виджета
    const getTypeLabel = (type) => {
        switch (type) {
            case 'chart': return 'Chart';
            case 'list': return 'List';
            default: return 'Widget';
        }
    };
    
    // Получить цвет бейджа для типа виджета
    const getTypeBadgeColor = (type) => {
        switch (type) {
            case 'chart': return 'bg-blue-100 text-blue-800';
            case 'list': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Widgets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {widgetList.map(widget => (
                    <div 
                        key={widget.id} 
                        className="border rounded-lg p-4 flex justify-between hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col">
                            <div className="flex items-center mb-1">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                    <span className="text-blue-500">{widget.title.charAt(0)}</span>
                                </div>
                                <span className="font-medium">{widget.title}</span>
                            </div>
                            <div className="ml-11 text-sm text-gray-500">
                                {widget.content}
                            </div>
                            <div className="flex mt-2 ml-11 gap-2">
                                <span className={`text-xs px-2 py-1 rounded ${getTypeBadgeColor(widget.type)}`}>
                                    {getTypeLabel(widget.type)}
                                </span>
                                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                                    Min: {widget.minW}×{widget.minH}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => onWidgetToggle(widget.id)}
                            className={`px-3 py-1 rounded flex items-center self-start ml-4 h-8 ${
                                activeWidgets.includes(widget.id)
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                        >
                            {activeWidgets.includes(widget.id) ? (
                                <>
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Remove
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageWidgets;