import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Code, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.jsx';
import Editor from '@monaco-editor/react';

function CustomCodeNode({ data, isConnectable }) {
  const [code, setCode] = useState(data.code || '// Escreva seu código aqui\nconsole.log("Hello World");');
  const [language, setLanguage] = useState(data.language || 'javascript');
  const [isOpen, setIsOpen] = useState(false);

  const handleCodeChange = (value) => {
    setCode(value);
    if (data.onCodeChange) {
      data.onCodeChange(value);
    }
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-purple-500 min-w-[200px]">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3"
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Code className="mr-2 h-4 w-4 text-purple-600" />
          <div className="font-bold text-sm">{data.label}</div>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Code className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Editor de Código Customizado</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col h-full space-y-2">
              <div className="flex space-x-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-1 border rounded"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                </select>
              </div>
              <div className="flex-1 border rounded overflow-hidden">
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={handleCodeChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                  }}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setIsOpen(false)}>Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="text-xs text-gray-500 mt-1">
        {language === 'javascript' ? 'JavaScript' : 'Python'}
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

export default memo(CustomCodeNode);

