import React from 'react';

const DashboardItem = ({ children, id, onDragStart, onDragOver, onDrop }) => {
    return (
        <div
            id={id}
            className="dashboard-item"
            draggable="true"
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {children}
        </div>
    );
};

export default DashboardItem;
