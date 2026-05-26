import { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const ArchitectureFlow = ({ flowData }) => {
  // Convert standard nodes/edges to React Flow format
  // Auto-layout simple horizontal flow for demonstration
  const initialNodes = flowData.nodes.map((node, index) => ({
    id: node.id,
    type: 'default',
    data: { label: node.label },
    position: { x: index * 200, y: (index % 2 === 0 ? 50 : 150) },
    style: {
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '10px 15px',
      fontSize: '12px',
      fontWeight: '500',
      boxShadow: 'var(--shadow-sm)'
    },
    className: 'react-flow__node-custom'
  }));

  const initialEdges = flowData.edges.map((edge) => ({
    id: `e${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    animated: true,
    style: { stroke: 'var(--accent-primary)', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'var(--accent-primary)',
    },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ height: '300px', width: '100%', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="var(--text-tertiary)" gap={16} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default ArchitectureFlow;
