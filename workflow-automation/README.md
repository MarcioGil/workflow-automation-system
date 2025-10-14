# Workflow Automation - Frontend

Interface visual para criação e gerenciamento de workflows de automação.

## Tecnologias

- **React 19**: Framework JavaScript para construção de interfaces
- **Vite**: Build tool e dev server de alta performance
- **React Flow**: Biblioteca para criação de editores visuais baseados em nós
- **Monaco Editor**: Editor de código (mesmo do VS Code)
- **Tailwind CSS**: Framework CSS utility-first
- **shadcn/ui**: Componentes de UI reutilizáveis
- **Lucide Icons**: Biblioteca de ícones

## Estrutura de Componentes

### WorkflowEditor
Componente principal que gerencia o canvas de edição, paleta de nós e ações do workflow.

### CustomCodeNode
Nó customizado que permite edição e execução de código JavaScript ou Python através do Monaco Editor.

### ActionNode
Nó genérico para ações de automação (e-mail, HTTP, redes sociais, CRM).

## Instalação

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm run dev

# Build para produção
pnpm run build

# Preview do build de produção
pnpm run preview
```

## Configuração

O frontend se comunica com o backend através da API REST. Por padrão, assume que o backend está rodando em `http://localhost:5000`.

Para alterar a URL do backend, você pode criar um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://seu-backend.com
```

## Scripts Disponíveis

- `pnpm run dev`: Inicia o servidor de desenvolvimento
- `pnpm run build`: Cria build de produção
- `pnpm run preview`: Visualiza o build de produção localmente
- `pnpm run lint`: Executa o linter ESLint

## Personalização

### Adicionando Novos Tipos de Nós

Para adicionar um novo tipo de nó:

1. Crie um novo componente em `src/components/`
2. Registre o componente em `nodeTypes` no `WorkflowEditor.jsx`
3. Adicione um botão na paleta de nós

### Estilização

O projeto usa Tailwind CSS para estilização. As cores e temas podem ser customizados em `src/App.css`.

## Desenvolvimento

Durante o desenvolvimento, o servidor Vite oferece Hot Module Replacement (HMR), permitindo ver as mudanças instantaneamente sem recarregar a página.

