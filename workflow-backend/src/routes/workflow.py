from flask import Blueprint, request, jsonify
from src.models.workflow import db, Workflow, WorkflowExecution
from datetime import datetime
import json

workflow_bp = Blueprint('workflow', __name__)

@workflow_bp.route('/workflows', methods=['GET'])
def get_workflows():
    """Listar todos os workflows"""
    workflows = Workflow.query.all()
    return jsonify([w.to_dict() for w in workflows]), 200

@workflow_bp.route('/workflows/<int:workflow_id>', methods=['GET'])
def get_workflow(workflow_id):
    """Obter um workflow específico"""
    workflow = Workflow.query.get_or_404(workflow_id)
    return jsonify(workflow.to_dict()), 200

@workflow_bp.route('/workflows', methods=['POST'])
def create_workflow():
    """Criar um novo workflow"""
    data = request.get_json()
    
    if not data or 'name' not in data:
        return jsonify({'error': 'Nome do workflow é obrigatório'}), 400
    
    workflow = Workflow(
        name=data['name'],
        description=data.get('description', ''),
        nodes=json.dumps(data.get('nodes', [])),
        edges=json.dumps(data.get('edges', [])),
        is_active=data.get('is_active', True)
    )
    
    db.session.add(workflow)
    db.session.commit()
    
    return jsonify(workflow.to_dict()), 201

@workflow_bp.route('/workflows/<int:workflow_id>', methods=['PUT'])
def update_workflow(workflow_id):
    """Atualizar um workflow existente"""
    workflow = Workflow.query.get_or_404(workflow_id)
    data = request.get_json()
    
    if 'name' in data:
        workflow.name = data['name']
    if 'description' in data:
        workflow.description = data['description']
    if 'nodes' in data:
        workflow.nodes = json.dumps(data['nodes'])
    if 'edges' in data:
        workflow.edges = json.dumps(data['edges'])
    if 'is_active' in data:
        workflow.is_active = data['is_active']
    
    workflow.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(workflow.to_dict()), 200

@workflow_bp.route('/workflows/<int:workflow_id>', methods=['DELETE'])
def delete_workflow(workflow_id):
    """Deletar um workflow"""
    workflow = Workflow.query.get_or_404(workflow_id)
    db.session.delete(workflow)
    db.session.commit()
    
    return jsonify({'message': 'Workflow deletado com sucesso'}), 200

@workflow_bp.route('/workflows/<int:workflow_id>/execute', methods=['POST'])
def execute_workflow(workflow_id):
    """Executar um workflow"""
    workflow = Workflow.query.get_or_404(workflow_id)
    
    # Criar registro de execução
    execution = WorkflowExecution(
        workflow_id=workflow_id,
        status='running'
    )
    db.session.add(execution)
    db.session.commit()
    
    try:
        # Importar o executor de workflows
        from src.services.workflow_executor import WorkflowExecutor
        
        executor = WorkflowExecutor(workflow)
        result = executor.execute()
        
        # Atualizar execução com sucesso
        execution.status = 'completed'
        execution.result = json.dumps(result)
        execution.completed_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'execution_id': execution.id,
            'status': 'completed',
            'result': result
        }), 200
        
    except Exception as e:
        # Atualizar execução com erro
        execution.status = 'failed'
        execution.error = str(e)
        execution.completed_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'execution_id': execution.id,
            'status': 'failed',
            'error': str(e)
        }), 500

@workflow_bp.route('/executions/<int:execution_id>', methods=['GET'])
def get_execution(execution_id):
    """Obter detalhes de uma execução"""
    execution = WorkflowExecution.query.get_or_404(execution_id)
    return jsonify(execution.to_dict()), 200

