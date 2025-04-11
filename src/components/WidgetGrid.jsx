import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Widget from './Widget';

const ResponsiveGridLayout = WidthProvider(Responsive);

const WidgetGrid = ({ 
  layouts, 
  activeWidgets, 
  widgetList, 
  isEditing, 
  onLayoutChange, 
  onRemoveWidget 
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <ResponsiveGridLayout
        className={`layout ${isEditing ? 'editing' : ''}`}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 4, xs: 2, xxs: 1 }}
        rowHeight={100}
        onLayoutChange={onLayoutChange}
        isDraggable={isEditing}
        isResizable={isEditing}
        isDroppable={isEditing}
        useCSSTransforms={true}
        compactType="vertical"
        draggableCancel=".widget-remove-btn"
        resizeHandles={['se']}
        margin={[10, 10]}
      >
        {activeWidgets.map(widgetId => {
          const widgetInfo = widgetList.find(w => w.id === widgetId);
          if (!widgetInfo) return null;

          return (
            <div 
              key={widgetId} 
              className={`shadow rounded-lg bg-white ${isEditing ? 'editing' : ''}`}
              data-min-h={widgetInfo.minH}
              data-min-w={widgetInfo.minW}
            >
              <Widget
                title={widgetInfo.title}
                content={widgetInfo.content}
                type={widgetInfo.type}
                isEditing={isEditing}
                onRemove={() => onRemoveWidget(widgetId)}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default WidgetGrid; 