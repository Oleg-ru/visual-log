import { useState } from 'react';
import {
    ReactFlow,
    Controls
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css'
import Examination from "./components/Examination/Examination.jsx";
import Call from "./components/Call/Call.jsx";
import Variable from "./components/Variable/Variable.jsx";

//test data
const dataJson = {
    "text": "Аналитика продаж",
    "jsonData": {
        "period": "2024-01",
        "metrics": {
            "revenue": 125000,
            "orders": 342,
            "average_check": 365.5,
            "conversion_rate": 3.45
        },
        "top_products": [
            { "id": "P001", "name": "Ноутбук", "sales": 45, "revenue": 112500 },
            { "id": "P002", "name": "Мышь", "sales": 120, "revenue": 3600 },
            { "id": "P003", "name": "Клавиатура", "sales": 89, "revenue": 8900 }
        ],
        "daily_stats": {
            "2024-01-01": { "orders": 12, "revenue": 4200 },
            "2024-01-02": { "orders": 15, "revenue": 5300 },
            "2024-01-03": { "orders": 8, "revenue": 2900 }
        },
        "forecast": {
            "next_month": 145000,
            "confidence": 0.85,
            "trend": "increasing"
        }
    }
};

const nodeTypes = {
    examination: Examination,
    call: Call,
    variable: Variable,
};

const initialNodes = [
    { id: 'n1', position: { x: 100, y: 100 }, data: { label: 'Node 1' }},
    { id: 'n2', position: { x: 0, y: 200 }, data: { label: 'Node 2' }},
    { id: 'n3', position: { x: 20, y: 300 }, data: { label: 'Node 2', text: "Это проверка"}, type: 'examination'},
    { id: 'n4', position: { x: 0, y: 400 }, data: { label: 'Node 23', text: "GET_DATA_MOTHERBOARD_HELLO", jsonData: dataJson}, type: 'call'},
    { id: 'n5', position: { x: 0, y: 500 }, data: { label: 'var', text: "Это переменная описывает что то"}, type: 'variable'},
];
const initialEdges = [
    { id: 'n1-n2', source: 'n1', target: 'n2', animated: true },
    { id: 'n2-n3', source: 'n2', target: 'n3', animated: true },
    { id: 'n3-n4', source: 'n3', target: 'n4', animated: true },
    { id: 'n4-n5', source: 'n4', target: 'n5', animated: true },
];

export default function App() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    return (
        <div style={{ width: '99vw', height: '98vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                nodesDraggable={false}
            >
                <Controls />
            </ReactFlow>
        </div>
    );
}