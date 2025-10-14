# Workflow Automation - Backend

API REST para gerenciamento e execução de workflows de automação.

## Tecnologias

- **Flask**: Framework web Python minimalista e flexível
- **SQLAlchemy**: ORM para Python
- **SQLite**: Banco de dados relacional leve
- **subprocess**: Módulo Python para execução de código isolado

## Estrutura do Projeto

```
workflow-backend/
├── src/
│   ├── models/
│   │   ├── workflow.py       # Modelos de dados
│   │   └── user.py           # Modelo de usuário (template)
│   ├── routes/
│   │   ├── workflow.py       # Rotas de workflows
│   │   └── user.py           # Rotas de usuário (template)
│   ├── services/
│   │   └── workflow_executor.py  # Motor de execução
│   ├── database/
│   │   └── app.db            # Banco de dados SQLite
│   └── main.py               # Ponto de entrada da aplicação
├── venv/                     # Ambiente virtual Python
└── requirements.txt          # Dependências Python
```

## Instalação

```bash
# Criar ambiente virtual
python3.11 -m venv venv

# Ativar ambiente virtual
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Iniciar servidor
python src/main.py
```

O servidor estará disponível em `http://localhost:5000`

## API Endpoints

### Workflows

#### Listar todos os workflows
```
GET /api/workflows
```

**Resposta**:
```json
[
  {
    "id": 1,
    "name": "Meu Workflow",
    "description": "Descrição do workflow",
    "nodes": [...],
    "edges": [...],
    "is_active": true,
    "created_at": "2025-10-14T12:00:00",
    "updated_at": "2025-10-14T12:00:00"
  }
]
```

#### Obter um workflow específico
```
GET /api/workflows/<id>
```

#### Criar um novo workflow
```
POST /api/workflows
Content-Type: application/json

{
  "name": "Novo Workflow",
  "description": "Descrição opcional",
  "nodes": [],
  "edges": [],
  "is_active": true
}
```

#### Atualizar um workflow
```
PUT /api/workflows/<id>
Content-Type: application/json

{
  "name": "Workflow Atualizado",
  "nodes": [...],
  "edges": [...]
}
```

#### Deletar um workflow
```
DELETE /api/workflows/<id>
```

#### Executar um workflow
```
POST /api/workflows/<id>/execute
```

**Resposta**:
```json
{
  "execution_id": 1,
  "status": "completed",
  "result": {
    "status": "success",
    "results": {...},
    "context": {...}
  }
}
```

### Execuções

#### Obter detalhes de uma execução
```
GET /api/executions/<id>
```

**Resposta**:
```json
{
  "id": 1,
  "workflow_id": 1,
  "status": "completed",
  "result": {...},
  "error": null,
  "started_at": "2025-10-14T12:00:00",
  "completed_at": "2025-10-14T12:00:05"
}
```

## Motor de Execução de Workflows

O `WorkflowExecutor` é responsável por processar e executar workflows. Ele:

1. **Analisa a estrutura do workflow**: Identifica nós e conexões
2. **Executa nós em sequência**: Começa pelos gatilhos e segue as conexões
3. **Mantém contexto compartilhado**: Dados podem ser passados entre nós
4. **Executa código customizado**: Roda código Python/JavaScript em processos isolados
5. **Registra resultados**: Armazena logs e resultados de cada execução

### Execução de Código Customizado

O código customizado é executado em processos isolados usando `subprocess`:

- **Python**: Executado com `python3.11`
- **JavaScript**: Executado com `node`
- **Timeout**: 30 segundos por padrão
- **Contexto**: Variável `context` disponível com dados de nós anteriores

### Segurança

⚠️ **IMPORTANTE**: A execução de código arbitrário apresenta riscos de segurança. Em produção, considere:

- Executar código em containers Docker isolados
- Implementar limitação de recursos (CPU, memória)
- Adicionar validação e sanitização de código
- Implementar sistema de permissões
- Usar sandboxing adicional (chroot, namespaces)

## Modelos de Dados

### Workflow
- `id`: ID único
- `name`: Nome do workflow
- `description`: Descrição opcional
- `nodes`: JSON com definição dos nós
- `edges`: JSON com conexões entre nós
- `is_active`: Status ativo/inativo
- `created_at`: Data de criação
- `updated_at`: Data de última atualização

### WorkflowExecution
- `id`: ID único
- `workflow_id`: ID do workflow executado
- `status`: Status da execução (running, completed, failed)
- `result`: JSON com resultados
- `error`: Mensagem de erro (se houver)
- `started_at`: Data/hora de início
- `completed_at`: Data/hora de conclusão

## Desenvolvimento

### Adicionar Novos Tipos de Ações

Para adicionar suporte a novas ações (ex: enviar e-mail real):

1. Edite `src/services/workflow_executor.py`
2. Modifique o método `_execute_action()`
3. Adicione lógica específica baseada no `label` do nó
4. Instale bibliotecas necessárias e atualize `requirements.txt`

### Exemplo: Enviar E-mail

```python
def _execute_action(self, node_data: Dict[str, Any]) -> Any:
    label = node_data.get('label', '')
    
    if label == 'Enviar E-mail':
        # Usar biblioteca como sendgrid ou smtplib
        import smtplib
        # ... código para enviar e-mail
        return {'status': 'success', 'message': 'E-mail enviado'}
    
    # ... outras ações
```

## Testes

Para executar testes (quando implementados):

```bash
pytest
```

## Deploy

Para deploy em produção, considere:

1. Usar um servidor WSGI como Gunicorn
2. Configurar variáveis de ambiente para secrets
3. Usar PostgreSQL ao invés de SQLite
4. Implementar autenticação e autorização
5. Configurar CORS adequadamente
6. Usar HTTPS

Exemplo com Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 src.main:app
```

