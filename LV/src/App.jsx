import { useState, useCallback } from 'react';
import {ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Controls, Background} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css'
import Examination from "./components/Examination/Examination.jsx";
import Call from "./components/Call/Call.jsx";

const nodeTypes = {
    examination: Examination,
    call: Call,
};

const initialNodes = [
    { id: 'n1', position: { x: 100, y: 100 }, data: { label: 'Node 1' }},
    { id: 'n2', position: { x: 0, y: 200 }, data: { label: 'Node 2' }},
    { id: 'n3', position: { x: 0, y: 300 }, data: { label: 'Node 2', text: "Это проверка"}, type: 'examination'},
    { id: 'n4', position: { x: 0, y: 400 }, data: { label: 'Node 23', text: "GET_DATA_MOTHERBOARD_HELLO"}, type: 'call'},
];
const initialEdges = [
    { id: 'n1-n2', source: 'n1', target: 'n2' },
    { id: 'n1-n3', source: 'n1', target: 'n3' },
];

export default function App() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}