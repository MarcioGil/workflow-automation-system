import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Mail, Globe, Share2, UserPlus } from 'lucide-react';

const iconMap = {
  'Enviar E-mail': Mail,
  'HTTP Request': Globe,
  'Publicar Rede Social': Share2,
  'Adicionar ao CRM': UserPlus,
};

const colorMap = {
  'Enviar E-mail': 'border-blue-500 bg-blue-50',
  'HTTP Request': 'border-orange-500 bg-orange-50',
  'Publicar Rede Social': 'border-green-500 bg-green-50',
  'Adicionar ao CRM': 'border-pink-500 bg-pink-50',
};

function ActionNode({ data, isConnectable }) {
  const Icon = iconMap[data.label] || Globe;
  const colorClass = colorMap[data.label] || 'border-gray-500 bg-gray-50';

  return (
    <div className={`px-4 py-2 shadow-md rounded-md border-2 min-w-[200px] ${colorClass}`}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3"
      />
      
      <div className="flex items-center">
        <Icon className="mr-2 h-4 w-4" />
        <div className="font-bold text-sm">{data.label}</div>
      </div>
      
      <div className="text-xs text-gray-500 mt-1">
        Clique para configurar
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3"
      />
    </div>
  );
}

export default memo(ActionNode);

