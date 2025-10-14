import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button.jsx';
import { Play, Save, Plus, Webhook } from 'lucide-react';
import CustomCodeNode from './CustomCodeNode.jsx';
import ActionNode from './ActionNode.jsx';

// Definir os tipos de nós customizados
const nodeTypes = {
  customCode: CustomCodeNode,
  action: ActionNode,
};

// Nós iniciais de exemplo
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Gatilho: Webhook' },
    position: { x: 250, y: 50 },
    style: { 
      background: '#10b981', 
      color: 'white', 
      border: '2px solid #059669',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold',
    },
  },
];

const initialEdges = [];

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeIdCounter, setNodeIdCounter] = useState(2);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Função para adicionar um novo nó
  const addNode = (type, nodeType, label) => {
    const newNode = {
      id: `${nodeIdCounter}`,
      type: type,
      data: { 
        label: label,
        code: type === 'customCode' ? '// Escreva seu código aqui\nconsole.log("Hello World");' : undefined,
        language: type === 'customCode' ? 'javascript' : undefined,
      },
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeIdCounter(nodeIdCounter + 1);
  };

  // Função para executar o workflow
  const executeWorkflow = () => {
    alert('Executando workflow... (funcionalidade em desenvolvimento)');
  };

  // Função para salvar o workflow
  const saveWorkflow = () => {
    const workflowData = {
      nodes: nodes,
      edges: edges,
    };
    console.log('Workflow salvo:', workflowData);
    alert('Workflow salvo com sucesso!');
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        
        {/* Painel de controles */}
        <Panel position="top-left" className="bg-white p-4 rounded-lg shadow-lg space-y-2 max-w-xs">
          <h2 className="text-lg font-bold mb-2">Paleta de Nós</h2>
          
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-600 uppercase">Gatilhos</p>
            <Button
              onClick={() => addNode('input', 'trigger', 'Webhook')}
              className="w-full justify-start"
              variant="outline"
              size="sm"
            >
              <Webhook className="mr-2 h-4 w-4" />
              Webhook
            </Button>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-600 uppercase">Código</p>
            <Button
              onClick={() => addNode('customCode', 'code', 'Código Customizado')}
              className="w-full justify-start"
              variant="outline"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Código Customizado
            </Button>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-600 uppercase">Ações</p>
            <Button
              onClick={() => addNode('action', 'action', 'Enviar E-mail')}
              className="w-full justify-start"
              variant="outline"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Enviar E-mail
            </Button>
            <Button
              onClick={() => addNode('action', 'action', 'HTTP Request')}
              className="w-full justify-start"
              variant="outline"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              HTTP Request
            </Button>
            <Button
              onClick={() => addNode('action', 'action', 'Publicar Rede Social')}
              className="w-full justify-start"
              variant="outline"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Publicar Rede Social
            </Button>
            <Button
              onClick={() => addNode('action', 'action', 'Adicionar ao CRM')}
              className="w-full justify-start"
              variant="outline"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar ao CRM
            </Button>
          </div>
        </Panel>

        {/* Painel de ações */}
        <Panel position="top-right" className="bg-white p-4 rounded-lg shadow-lg space-x-2">
          <Button onClick={saveWorkflow} variant="default">
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
          <Button onClick={executeWorkflow} variant="default">
            <Play className="mr-2 h-4 w-4" />
            Executar
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

