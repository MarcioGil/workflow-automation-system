# Arquitetura Técnica - Workflow Automation System

Este documento descreve a arquitetura técnica detalhada do sistema de automação de workflows.

## Visão Geral da Arquitetura

O sistema segue uma arquitetura cliente-servidor tradicional com separação clara entre frontend e backend, comunicando-se através de uma API RESTful.

```
┌─────────────────────────────────────────────────────────────┐
│                         Cliente                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           React Frontend (Port 5173)                   │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │  Workflow   │  │  Custom Code │  │  Action Node │  │  │
│  │  │   Editor    │  │     Node     │  │              │  │  │
│  │  └─────────────┘  └──────────────┘  └──────────────┘  │  │
│  │         │                  │                  │         │  │
│  │         └──────────────────┴──────────────────┘         │  │
│  │                         │                                │  │
│  │                    React Flow                            │  │
│  └─────────────────────────┬─────────────────────────────┘  │
│                            │                                 │
│                       HTTP/REST                              │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                         Servidor                             │
│  ┌─────────────────────────┴─────────────────────────────┐  │
│  │           Flask Backend (Port 5000)                    │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │   Routes    │  │    Models    │  │   Services   │  │  │
│  │  │  (API REST) │  │  (SQLAlchemy)│  │  (Executor)  │  │  │
│  │  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘  │  │
│  │         │                │                  │           │  │
│  │         └────────────────┴──────────────────┘           │  │
│  │                         │                                │  │
│  │                    Flask App                             │  │
│  └─────────────────────────┬─────────────────────────────┘  │
│                            │                                 │
│                    ┌───────┴────────┐                        │
│                    │   SQLite DB    │                        │
│                    │   (app.db)     │                        │
│                    └────────────────┘                        │
│                            │                                 │
│                    ┌───────┴────────┐                        │
│                    │   Subprocess   │                        │
│                    │ (Code Executor)│                        │
│                    └────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

## Componentes do Frontend

### 1. WorkflowEditor (Componente Principal)

**Responsabilidades**:
- Gerenciar o estado do canvas (nós e conexões)
- Renderizar a paleta de nós disponíveis
- Fornecer controles de ação (salvar, executar)
- Coordenar a comunicação com o backend

**Tecnologias**:
- React Flow: Biblioteca para criação de editores baseados em nós
- React Hooks: `useState`, `useCallback` para gerenciamento de estado
- React Flow Hooks: `useNodesState`, `useEdgesState` para estado de nós e conexões

**Fluxo de Dados**:
```
Usuário → Adiciona Nó → Estado Atualizado → React Flow Renderiza
Usuário → Conecta Nós → Estado Atualizado → Conexão Criada
Usuário → Salvar → API Call → Backend Persiste
```

### 2. CustomCodeNode (Nó de Código)

**Responsabilidades**:
- Renderizar interface do nó de código
- Abrir editor Monaco em modal
- Gerenciar estado do código e linguagem
- Fornecer handles de conexão

**Tecnologias**:
- Monaco Editor: Editor de código completo
- shadcn/ui Dialog: Modal para o editor
- React Flow Handle: Pontos de conexão

**Estrutura de Dados**:
```javascript
{
  id: "2",
  type: "customCode",
  data: {
    label: "Código Customizado",
    code: "console.log('Hello');",
    language: "javascript"
  },
  position: { x: 100, y: 100 }
}
```

### 3. ActionNode (Nó de Ação)

**Responsabilidades**:
- Renderizar diferentes tipos de ações
- Aplicar ícones e cores específicas
- Fornecer interface de configuração (futuro)

**Tipos de Ações**:
- Enviar E-mail
- HTTP Request
- Publicar Rede Social
- Adicionar ao CRM

## Componentes do Backend

### 1. API REST (routes/workflow.py)

**Endpoints Implementados**:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/workflows` | Lista todos os workflows |
| GET | `/api/workflows/<id>` | Obtém um workflow específico |
| POST | `/api/workflows` | Cria novo workflow |
| PUT | `/api/workflows/<id>` | Atualiza workflow |
| DELETE | `/api/workflows/<id>` | Remove workflow |
| POST | `/api/workflows/<id>/execute` | Executa workflow |
| GET | `/api/executions/<id>` | Obtém detalhes de execução |

**Padrão de Resposta**:
```json
{
  "status": "success|error",
  "data": {...},
  "message": "Mensagem opcional"
}
```

### 2. Modelos de Dados (models/workflow.py)

**Workflow Model**:
```python
class Workflow(db.Model):
    id: Integer (PK)
    name: String(200)
    description: Text
    nodes: Text (JSON)
    edges: Text (JSON)
    is_active: Boolean
    created_at: DateTime
    updated_at: DateTime
```

**WorkflowExecution Model**:
```python
class WorkflowExecution(db.Model):
    id: Integer (PK)
    workflow_id: Integer (FK)
    status: String(50)
    result: Text (JSON)
    error: Text
    started_at: DateTime
    completed_at: DateTime
```

### 3. Motor de Execução (services/workflow_executor.py)

**Algoritmo de Execução**:

1. **Inicialização**:
   - Carregar workflow do banco
   - Parsear nós e conexões JSON
   - Inicializar contexto vazio

2. **Identificação de Gatilhos**:
   - Encontrar nós do tipo `input`
   - Validar existência de pelo menos um gatilho

3. **Execução em Profundidade**:
   ```
   Para cada nó de gatilho:
     Executar nó
     Armazenar resultado no contexto
     Para cada conexão de saída:
       Executar nó conectado recursivamente
   ```

4. **Execução de Nós**:
   - **Input**: Retorna mensagem de gatilho ativado
   - **CustomCode**: Executa código em subprocess
   - **Action**: Executa ação específica
   - **Default**: Retorna mensagem padrão

5. **Execução de Código Customizado**:
   ```
   Criar arquivo temporário
   Injetar contexto no código
   Executar em subprocess (Python/Node.js)
   Capturar stdout/stderr
   Limpar arquivo temporário
   Retornar resultado
   ```

**Isolamento de Código**:
- Cada execução roda em processo separado
- Timeout de 30 segundos
- Sem acesso ao sistema de arquivos do host
- Contexto injetado como variável global

## Fluxo de Dados Completo

### Criação de Workflow

```
1. Usuário arrasta nós no canvas
2. Usuário conecta nós
3. Usuário configura código customizado
4. Usuário clica em "Salvar"
5. Frontend serializa estado (nodes + edges)
6. POST /api/workflows com dados
7. Backend cria registro no banco
8. Retorna workflow com ID
9. Frontend atualiza estado local
```

### Execução de Workflow

```
1. Usuário clica em "Executar"
2. POST /api/workflows/<id>/execute
3. Backend cria WorkflowExecution (status: running)
4. WorkflowExecutor inicia processamento
5. Para cada nó:
   a. Executa lógica específica
   b. Atualiza contexto
   c. Registra resultado
6. Ao completar:
   a. Atualiza WorkflowExecution (status: completed)
   b. Armazena resultado JSON
7. Retorna resultado para frontend
8. Frontend exibe resultado (console/alert)
```

## Considerações de Segurança

### Execução de Código

**Riscos Atuais**:
- Código pode consumir recursos excessivos
- Possível execução de código malicioso
- Acesso limitado mas não totalmente isolado

**Mitigações Implementadas**:
- Timeout de 30 segundos
- Execução em subprocess separado
- Sem persistência de arquivos

**Melhorias Recomendadas**:
- Executar em containers Docker
- Implementar quotas de CPU/memória
- Usar sandboxing adicional (seccomp, AppArmor)
- Validar e sanitizar código antes da execução
- Implementar rate limiting

### API REST

**Riscos Atuais**:
- Sem autenticação
- Sem autorização
- Sem rate limiting
- CORS aberto

**Melhorias Recomendadas**:
- Implementar JWT ou OAuth2
- Sistema de permissões por usuário
- Rate limiting por IP/usuário
- CORS restrito a domínios específicos
- Validação de entrada rigorosa

## Escalabilidade

### Limitações Atuais

- SQLite não é ideal para múltiplos escritores
- Execução síncrona de workflows
- Sem cache de resultados
- Sem distribuição de carga

### Estratégias de Escalabilidade

**Banco de Dados**:
- Migrar para PostgreSQL ou MySQL
- Implementar connection pooling
- Adicionar índices em queries frequentes

**Execução de Workflows**:
- Implementar fila de mensagens (RabbitMQ, Kafka)
- Executar workflows de forma assíncrona
- Distribuir execução entre workers

**Cache**:
- Redis para cache de workflows frequentes
- Cache de resultados de execuções

**Load Balancing**:
- Múltiplas instâncias do backend
- Nginx ou HAProxy como load balancer

## Extensibilidade

### Adicionando Novos Tipos de Nós

1. **Frontend**:
   - Criar novo componente em `src/components/`
   - Registrar em `nodeTypes` no WorkflowEditor
   - Adicionar botão na paleta

2. **Backend**:
   - Adicionar lógica em `_execute_node()`
   - Implementar método específico se necessário

### Adicionando Integrações

1. **Instalar biblioteca** (ex: `sendgrid`, `twilio`)
2. **Criar serviço** em `src/services/`
3. **Modificar executor** para chamar serviço
4. **Adicionar configuração** no nó (frontend)

Exemplo:
```python
# src/services/email_service.py
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_email(to, subject, content):
    message = Mail(
        from_email='noreply@example.com',
        to_emails=to,
        subject=subject,
        html_content=content
    )
    sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    response = sg.send(message)
    return response
```

## Monitoramento e Logs

### Logs Atuais

- Logs de execução no console Flask
- Resultados armazenados no banco

### Melhorias Recomendadas

- Implementar logging estruturado (JSON)
- Usar biblioteca como `structlog`
- Enviar logs para serviço centralizado (ELK, Datadog)
- Métricas de performance (tempo de execução, taxa de erro)
- Alertas para falhas críticas

## Testes

### Estratégia de Testes

**Frontend**:
- Testes unitários com Jest
- Testes de componentes com React Testing Library
- Testes E2E com Playwright ou Cypress

**Backend**:
- Testes unitários com pytest
- Testes de integração para API
- Mocks para execução de código

**Exemplo de Teste**:
```python
def test_workflow_execution():
    workflow = create_test_workflow()
    executor = WorkflowExecutor(workflow)
    result = executor.execute()
    assert result['status'] == 'success'
```

## Deployment

### Opções de Deploy

**Frontend**:
- Vercel (recomendado)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

**Backend**:
- Heroku
- AWS EC2 + Gunicorn
- Docker + Kubernetes
- Google Cloud Run

**Full Stack**:
- Docker Compose
- Kubernetes com Helm
- AWS Elastic Beanstalk

### Configuração Docker

```dockerfile
# Backend Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY src/ ./src/
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "src.main:app"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./workflow-backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://...
  
  frontend:
    build: ./workflow-automation
    ports:
      - "80:80"
    depends_on:
      - backend
```

## Conclusão

Esta arquitetura fornece uma base sólida para um sistema de automação de workflows. As principais áreas de melhoria incluem segurança, escalabilidade e adição de integrações reais com serviços externos.

