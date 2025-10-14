# Workflow Automation - Sistema de Automação de Fluxos de Trabalho

Uma aplicação completa de automação de workflows inspirada no N8N, desenvolvida com React e Flask. O sistema permite criar fluxos de trabalho visuais através de uma interface drag-and-drop, com suporte para execução de código customizado em JavaScript e Python.

## 📋 Visão Geral

Este projeto é uma ferramenta de automação de workflows que permite aos usuários criar, gerenciar e executar fluxos de trabalho complexos através de uma interface visual intuitiva. A aplicação é especialmente útil para automação de tarefas de marketing e vendas, como captura de leads, envio de e-mails e publicação em redes sociais.

### Principais Funcionalidades

**Interface Visual Intuitiva**: Editor drag-and-drop para criação de workflows com nós conectáveis, permitindo a construção de fluxos complexos de forma visual e intuitiva.

**Execução de Código Customizado**: Suporte nativo para execução de código JavaScript e Python diretamente nos workflows, com um editor de código integrado baseado no Monaco Editor (o mesmo editor do VS Code).

**Nós de Automação**: Diversos tipos de nós pré-configurados para automação de tarefas comuns, incluindo gatilhos (webhooks), ações (envio de e-mail, requisições HTTP, publicação em redes sociais) e integração com CRMs.

**Persistência de Workflows**: Sistema completo de gerenciamento de workflows com armazenamento em banco de dados SQLite, permitindo salvar, editar e reutilizar fluxos de trabalho.

**Histórico de Execuções**: Rastreamento completo de todas as execuções de workflows, incluindo status, resultados e logs de erro para facilitar a depuração.

**Arquitetura Modular**: Design extensível que facilita a adição de novos tipos de nós e integrações com serviços externos.

## 🏗️ Arquitetura do Sistema

O projeto está dividido em dois componentes principais que se comunicam através de uma API RESTful:

### Frontend (React + Vite)

O frontend é construído com React e utiliza a biblioteca React Flow para o editor visual de workflows. A interface permite aos usuários criar e gerenciar fluxos de trabalho de forma intuitiva através de componentes drag-and-drop.

**Tecnologias utilizadas**: React 19, Vite, React Flow, Monaco Editor, Tailwind CSS, shadcn/ui, Lucide Icons.

**Principais componentes**:
- `WorkflowEditor`: Componente principal do editor visual
- `CustomCodeNode`: Nó customizado para execução de código
- `ActionNode`: Nó genérico para ações de automação

### Backend (Flask + Python)

O backend é desenvolvido em Flask e fornece uma API RESTful para gerenciamento e execução de workflows. Utiliza SQLite para persistência de dados e executa código customizado em ambientes isolados.

**Tecnologias utilizadas**: Flask, SQLAlchemy, SQLite, subprocess (para execução de código).

**Principais módulos**:
- `models/workflow.py`: Modelos de dados para workflows e execuções
- `routes/workflow.py`: Endpoints da API REST
- `services/workflow_executor.py`: Motor de execução de workflows

## 🚀 Instalação e Configuração

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em seu sistema:

- **Node.js** (versão 18 ou superior)
- **Python** (versão 3.11 ou superior)
- **pnpm** (gerenciador de pacotes Node.js)
- **Git** (para controle de versão)

### Instalação do Frontend

```bash
# Navegar para o diretório do frontend
cd workflow-automation

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm run dev
```

O frontend estará disponível em `http://localhost:5173`

### Instalação do Backend

```bash
# Navegar para o diretório do backend
cd workflow-backend

# Criar e ativar ambiente virtual
python3.11 -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Iniciar servidor Flask
python src/main.py
```

O backend estará disponível em `http://localhost:5000`

## 📖 Como Usar

### Criando um Workflow

1. **Adicionar Nós**: Use a paleta de nós no lado esquerdo para adicionar diferentes tipos de nós ao canvas. Os nós disponíveis incluem gatilhos (Webhook), código customizado e ações (Enviar E-mail, HTTP Request, etc.).

2. **Conectar Nós**: Clique e arraste a partir da saída (parte inferior) de um nó até a entrada (parte superior) de outro nó para criar conexões. As conexões definem o fluxo de execução do workflow.

3. **Configurar Código Customizado**: Clique no ícone de código dentro de um nó de código customizado para abrir o editor. Você pode escrever código JavaScript ou Python que será executado durante a execução do workflow.

4. **Salvar Workflow**: Clique no botão "Salvar" no canto superior direito para persistir o workflow no banco de dados.

5. **Executar Workflow**: Clique no botão "Executar" para iniciar a execução do workflow. Os resultados serão exibidos no console do navegador.

### Exemplo de Código Customizado

**JavaScript**:
```javascript
// Acessar contexto de nós anteriores
console.log("Contexto:", context);

// Processar dados
const resultado = {
  mensagem: "Hello World",
  timestamp: new Date().toISOString()
};

console.log(JSON.stringify(resultado));
```

**Python**:
```python
import json
from datetime import datetime

# Acessar contexto de nós anteriores
print("Contexto:", json.dumps(context))

# Processar dados
resultado = {
    "mensagem": "Hello World",
    "timestamp": datetime.now().isoformat()
}

print(json.dumps(resultado))
```

## 🔌 API REST

O backend expõe os seguintes endpoints para gerenciamento de workflows:

### Workflows

- `GET /api/workflows` - Listar todos os workflows
- `GET /api/workflows/<id>` - Obter detalhes de um workflow específico
- `POST /api/workflows` - Criar um novo workflow
- `PUT /api/workflows/<id>` - Atualizar um workflow existente
- `DELETE /api/workflows/<id>` - Deletar um workflow
- `POST /api/workflows/<id>/execute` - Executar um workflow

### Execuções

- `GET /api/executions/<id>` - Obter detalhes de uma execução específica

### Exemplo de Requisição

```bash
# Criar um novo workflow
curl -X POST http://localhost:5000/api/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Meu Primeiro Workflow",
    "description": "Workflow de teste",
    "nodes": [],
    "edges": []
  }'
```

## 🛠️ Estrutura do Projeto

```
workflow-automation-project/
├── workflow-automation/          # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── WorkflowEditor.jsx
│   │   │   ├── CustomCodeNode.jsx
│   │   │   ├── ActionNode.jsx
│   │   │   └── ui/              # Componentes shadcn/ui
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── workflow-backend/             # Backend Flask
│   ├── src/
│   │   ├── models/
│   │   │   └── workflow.py
│   │   ├── routes/
│   │   │   └── workflow.py
│   │   ├── services/
│   │   │   └── workflow_executor.py
│   │   ├── database/
│   │   │   └── app.db
│   │   └── main.py
│   ├── venv/
│   └── requirements.txt
│
└── README.md                     # Este arquivo
```

## 🔐 Segurança

A execução de código customizado é realizada em processos isolados com timeout de 30 segundos para prevenir execuções infinitas. No entanto, para ambientes de produção, recomenda-se implementar medidas adicionais de segurança, incluindo:

- Execução em containers Docker isolados
- Limitação de recursos (CPU, memória)
- Validação e sanitização de código
- Sistema de permissões e autenticação
- Rate limiting para execuções

## 🚧 Próximos Passos e Melhorias

Este projeto é uma implementação inicial com funcionalidades básicas. Algumas melhorias planejadas incluem:

- **Integrações Reais**: Implementar conectores nativos com serviços populares (SendGrid para e-mail, APIs de redes sociais, CRMs como HubSpot/Salesforce)
- **Sistema de Autenticação**: Adicionar login de usuários e gerenciamento de permissões
- **Agendamento de Workflows**: Permitir execução agendada de workflows (cron jobs)
- **Webhooks**: Implementar endpoints de webhook para gatilhos externos
- **Interface de Configuração de Nós**: Painéis de configuração detalhados para cada tipo de nó
- **Visualização de Logs**: Interface para visualizar logs e resultados de execuções
- **Testes Automatizados**: Adicionar testes unitários e de integração
- **Deploy em Produção**: Configuração para deploy com Docker e Kubernetes

## 📝 Licença

Este projeto é fornecido como exemplo educacional e pode ser usado livremente para fins de aprendizado e desenvolvimento.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests com melhorias, correções de bugs ou novas funcionalidades.

## 📧 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato através do GitHub.

---

**Desenvolvido com ❤️ usando React, Flask e tecnologias modernas de desenvolvimento web.**

