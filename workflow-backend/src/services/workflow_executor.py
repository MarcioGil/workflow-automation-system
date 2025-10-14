import json
import subprocess
import tempfile
import os
from typing import Dict, List, Any

class WorkflowExecutor:
    """Executor de workflows que processa nós em sequência"""
    
    def __init__(self, workflow):
        self.workflow = workflow
        self.nodes = json.loads(workflow.nodes)
        self.edges = json.loads(workflow.edges)
        self.context = {}  # Contexto compartilhado entre nós
        
    def execute(self) -> Dict[str, Any]:
        """Executa o workflow completo"""
        results = {}
        
        # Encontrar o nó inicial (gatilho)
        start_nodes = [node for node in self.nodes if node.get('type') == 'input']
        
        if not start_nodes:
            raise Exception("Nenhum nó de gatilho encontrado no workflow")
        
        # Executar a partir do primeiro nó de gatilho
        for start_node in start_nodes:
            node_results = self._execute_from_node(start_node['id'])
            results.update(node_results)
        
        return {
            'status': 'success',
            'results': results,
            'context': self.context
        }
    
    def _execute_from_node(self, node_id: str, visited: set = None) -> Dict[str, Any]:
        """Executa um nó e seus sucessores"""
        if visited is None:
            visited = set()
        
        if node_id in visited:
            return {}
        
        visited.add(node_id)
        results = {}
        
        # Encontrar o nó
        node = next((n for n in self.nodes if n['id'] == node_id), None)
        if not node:
            return results
        
        # Executar o nó
        node_result = self._execute_node(node)
        results[node_id] = node_result
        
        # Atualizar contexto
        self.context[node_id] = node_result
        
        # Encontrar e executar nós conectados
        connected_edges = [e for e in self.edges if e.get('source') == node_id]
        
        for edge in connected_edges:
            target_id = edge.get('target')
            if target_id:
                child_results = self._execute_from_node(target_id, visited)
                results.update(child_results)
        
        return results
    
    def _execute_node(self, node: Dict[str, Any]) -> Any:
        """Executa um nó específico"""
        node_type = node.get('type')
        node_data = node.get('data', {})
        label = node_data.get('label', '')
        
        # Nó de gatilho (input)
        if node_type == 'input':
            return {
                'type': 'trigger',
                'label': label,
                'message': f'Gatilho {label} ativado'
            }
        
        # Nó de código customizado
        elif node_type == 'customCode':
            return self._execute_custom_code(node_data)
        
        # Nó de ação
        elif node_type == 'action':
            return self._execute_action(node_data)
        
        # Nó padrão
        else:
            return {
                'type': 'default',
                'label': label,
                'message': f'Nó {label} executado'
            }
    
    def _execute_custom_code(self, node_data: Dict[str, Any]) -> Any:
        """Executa código customizado (JavaScript ou Python)"""
        code = node_data.get('code', '')
        language = node_data.get('language', 'javascript')
        
        if not code:
            return {'error': 'Nenhum código fornecido'}
        
        try:
            if language == 'python':
                return self._execute_python_code(code)
            elif language == 'javascript':
                return self._execute_javascript_code(code)
            else:
                return {'error': f'Linguagem não suportada: {language}'}
        except Exception as e:
            return {'error': str(e)}
    
    def _execute_python_code(self, code: str) -> Any:
        """Executa código Python em um ambiente isolado"""
        # Criar arquivo temporário com o código
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
            # Adicionar contexto ao código
            full_code = f"""
import json
import sys

# Contexto do workflow
context = {json.dumps(self.context)}

# Código do usuário
{code}
"""
            f.write(full_code)
            temp_file = f.name
        
        try:
            # Executar o código Python
            result = subprocess.run(
                ['python3.11', temp_file],
                capture_output=True,
                text=True,
                timeout=30  # Timeout de 30 segundos
            )
            
            output = {
                'stdout': result.stdout,
                'stderr': result.stderr,
                'returncode': result.returncode
            }
            
            if result.returncode != 0:
                output['error'] = f'Código Python falhou com código {result.returncode}'
            
            return output
            
        finally:
            # Remover arquivo temporário
            if os.path.exists(temp_file):
                os.remove(temp_file)
    
    def _execute_javascript_code(self, code: str) -> Any:
        """Executa código JavaScript usando Node.js"""
        # Criar arquivo temporário com o código
        with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
            # Adicionar contexto ao código
            full_code = f"""
// Contexto do workflow
const context = {json.dumps(self.context)};

// Código do usuário
{code}
"""
            f.write(full_code)
            temp_file = f.name
        
        try:
            # Executar o código JavaScript
            result = subprocess.run(
                ['node', temp_file],
                capture_output=True,
                text=True,
                timeout=30  # Timeout de 30 segundos
            )
            
            output = {
                'stdout': result.stdout,
                'stderr': result.stderr,
                'returncode': result.returncode
            }
            
            if result.returncode != 0:
                output['error'] = f'Código JavaScript falhou com código {result.returncode}'
            
            return output
            
        finally:
            # Remover arquivo temporário
            if os.path.exists(temp_file):
                os.remove(temp_file)
    
    def _execute_action(self, node_data: Dict[str, Any]) -> Any:
        """Executa uma ação (placeholder para integrações futuras)"""
        label = node_data.get('label', '')
        
        # Aqui você pode adicionar lógica específica para cada tipo de ação
        # Por exemplo: enviar e-mail, fazer requisição HTTP, etc.
        
        return {
            'type': 'action',
            'label': label,
            'message': f'Ação {label} executada (placeholder)',
            'status': 'success'
        }

