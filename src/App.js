import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import WidgetGrid from './components/WidgetGrid';
import ManageWidgets from './components/ManageWidgets';
import Footer from './components/Footer';
import { getFromStorage, setToStorage } from './utils/storageUtils';

// Предустановленные виджеты
const WIDGET_LIST = [
  { 
    id: 'widget1', 
    title: 'Sales Overview', 
    content: 'Sales data visualization',
    type: 'chart',
    minH: 2,
    minW: 2
  },
  { 
    id: 'widget2', 
    title: 'Recent Activities', 
    content: 'List of recent activities',
    type: 'list',
    minH: 1,
    minW: 1
  },
  { 
    id: 'widget3', 
    title: 'User Statistics', 
    content: 'Active users statistics',
    type: 'chart',
    minH: 2,
    minW: 2
  },
  { 
    id: 'widget4', 
    title: 'Revenue Chart', 
    content: 'Monthly revenue chart',
    type: 'chart',
    minH: 2,
    minW: 2
  },
  { 
    id: 'widget5', 
    title: 'Popular Products', 
    content: 'Most popular products list',
    type: 'list',
    minH: 1,
    minW: 1
  },
];

// Дефолтная разметка для виджетов c минимальными размерами
const getDefaultLayouts = () => ({
  lg: [
    { i: 'widget1', x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
    { i: 'widget2', x: 2, y: 0, w: 2, h: 3, minW: 1, minH: 1 },
    { i: 'widget3', x: 4, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
  ],
});

function App() {
  const [layouts, setLayouts] = useState(getDefaultLayouts());
  const [activeWidgets, setActiveWidgets] = useState(['widget1', 'widget2', 'widget3']);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedLayouts = getFromStorage('dashboard-layouts');
    const savedWidgets = getFromStorage('active-widgets');

    if (savedLayouts) {
      const parsedLayouts = savedLayouts;
      if (parsedLayouts.lg) {
        parsedLayouts.lg = parsedLayouts.lg.map(item => {
          const widgetInfo = WIDGET_LIST.find(w => w.id === item.i);
          if (widgetInfo) {
            return {
              ...item,
              minW: widgetInfo.minW,
              minH: widgetInfo.minH
            };
          }
          return item;
        });
      }
      setLayouts(parsedLayouts);
    }

    if (savedWidgets) {
      setActiveWidgets(savedWidgets);
    }
  }, []);

  const handleLayoutChange = (layout, layouts) => {
    if (layouts.lg) {
      layouts.lg = layouts.lg.map(item => {
        const widgetInfo = WIDGET_LIST.find(w => w.id === item.i);
        if (widgetInfo && (!item.minW || !item.minH)) {
          return {
            ...item,
            minW: widgetInfo.minW,
            minH: widgetInfo.minH
          };
        }
        return item;
      });
    }
    setLayouts(layouts);
    setToStorage('dashboard-layouts', layouts);
  };

  const handleWidgetToggle = (widgetId) => {
    let newActiveWidgets;

    if (activeWidgets.includes(widgetId)) {
      newActiveWidgets = activeWidgets.filter(id => id !== widgetId);
    } else {
      newActiveWidgets = [...activeWidgets, widgetId];
      
      const currentLayout = layouts.lg || [];
      const existingItem = currentLayout.find(item => item.i === widgetId);
      
      if (!existingItem) {
        const maxY = currentLayout.reduce((max, item) => Math.max(max, item.y + item.h), 0);
        const widgetInfo = WIDGET_LIST.find(w => w.id === widgetId);
        
        const newLayoutItem = {
          i: widgetId,
          x: 0,
          y: maxY,
          w: widgetInfo?.minW || 2,
          h: widgetInfo?.minH || 2,
          minW: widgetInfo?.minW || 2,
          minH: widgetInfo?.minH || 2
        };
        
        const newLayouts = {
          ...layouts,
          lg: [...currentLayout, newLayoutItem]
        };
        
        setLayouts(newLayouts);
        setToStorage('dashboard-layouts', newLayouts);
      }
    }

    setActiveWidgets(newActiveWidgets);
    setToStorage('active-widgets', newActiveWidgets);
  };

  const handleSaveChanges = () => {
    setToStorage('dashboard-layouts', layouts);
    setToStorage('active-widgets', activeWidgets);
    setIsEditing(false);
  };

  const handleCancelChanges = () => {
    const savedLayouts = getFromStorage('dashboard-layouts');
    const savedWidgets = getFromStorage('active-widgets');

    if (savedLayouts) {
      const parsedLayouts = savedLayouts;
      if (parsedLayouts.lg) {
        parsedLayouts.lg = parsedLayouts.lg.map(item => {
          const widgetInfo = WIDGET_LIST.find(w => w.id === item.i);
          if (widgetInfo) {
            return {
              ...item,
              minW: widgetInfo.minW,
              minH: widgetInfo.minH
            };
          }
          return item;
        });
      }
      setLayouts(parsedLayouts);
    } else {
      setLayouts(getDefaultLayouts());
    }

    if (savedWidgets) {
      setActiveWidgets(savedWidgets);
    } else {
      setActiveWidgets(['widget1', 'widget2', 'widget3']);
    }

    setIsEditing(false);
  };

  const handleRemoveWidget = (widgetId) => {
    const newActiveWidgets = activeWidgets.filter(id => id !== widgetId);
    setActiveWidgets(newActiveWidgets);
    setToStorage('active-widgets', newActiveWidgets);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header 
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSaveChanges}
        onCancel={handleCancelChanges}
      />

      {isEditing && (
        <ManageWidgets
          widgetList={WIDGET_LIST}
          activeWidgets={activeWidgets}
          onWidgetToggle={handleWidgetToggle}
        />
      )}

      <WidgetGrid
        layouts={layouts}
        activeWidgets={activeWidgets}
        widgetList={WIDGET_LIST}
        isEditing={isEditing}
        onLayoutChange={handleLayoutChange}
        onRemoveWidget={handleRemoveWidget}
      />

      <Footer />
    </div>
  );
}

export default App;