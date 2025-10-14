# Guia de Contribuição

Obrigado por considerar contribuir para o Workflow Automation System! Este documento fornece diretrizes para contribuições ao projeto.

## Como Contribuir

### Reportando Bugs

Se você encontrou um bug, por favor abra uma issue no GitHub com as seguintes informações:

- **Descrição clara do problema**: O que aconteceu e o que você esperava que acontecesse
- **Passos para reproduzir**: Lista detalhada de passos para reproduzir o bug
- **Ambiente**: Sistema operacional, versão do Node.js, versão do Python, navegador
- **Screenshots**: Se aplicável, adicione screenshots para ilustrar o problema
- **Logs de erro**: Inclua mensagens de erro do console

### Sugerindo Melhorias

Para sugerir novas funcionalidades ou melhorias:

1. Verifique se já não existe uma issue similar
2. Abra uma nova issue com a tag `enhancement`
3. Descreva claramente a funcionalidade proposta
4. Explique por que essa melhoria seria útil
5. Se possível, sugira uma implementação

### Pull Requests

1. **Fork o repositório** e crie uma branch a partir de `master`
2. **Nomeie a branch** de forma descritiva (ex: `feature/email-integration`, `fix/node-connection-bug`)
3. **Faça suas alterações** seguindo as convenções de código do projeto
4. **Adicione testes** se aplicável
5. **Atualize a documentação** se necessário
6. **Commit suas mudanças** com mensagens claras e descritivas
7. **Push para sua branch** e abra um Pull Request

## Convenções de Código

### Frontend (JavaScript/React)

- Use **2 espaços** para indentação
- Siga o **ESLint** configurado no projeto
- Use **camelCase** para variáveis e funções
- Use **PascalCase** para componentes React
- Prefira **arrow functions** para componentes funcionais
- Adicione **PropTypes** ou **TypeScript** para validação de props

Exemplo:
```javascript
import { useState } from 'react';

function MyComponent({ data }) {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return (
    <button onClick={handleClick}>
      Count: {count}
    </button>
  );
}

export default MyComponent;
```

### Backend (Python/Flask)

- Use **4 espaços** para indentação
- Siga o **PEP 8** (use `black` para formatação)
- Use **snake_case** para funções e variáveis
- Use **PascalCase** para classes
- Adicione **docstrings** para funções e classes
- Use **type hints** quando possível

Exemplo:
```python
from typing import Dict, Any

def execute_workflow(workflow_id: int) -> Dict[str, Any]:
    """
    Executa um workflow específico.
    
    Args:
        workflow_id: ID do workflow a ser executado
        
    Returns:
        Dicionário com o resultado da execução
    """
    workflow = Workflow.query.get(workflow_id)
    executor = WorkflowExecutor(workflow)
    return executor.execute()
```

## Estrutura de Commits

Use mensagens de commit claras e descritivas seguindo o padrão:

```
tipo(escopo): descrição curta

Descrição mais detalhada se necessário.

Referências a issues: #123
```

**Tipos de commit**:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Formatação, ponto e vírgula faltando, etc
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Tarefas de manutenção

**Exemplos**:
```
feat(frontend): adiciona suporte para nós condicionais

Implementa nós if/else para permitir fluxos condicionais
nos workflows.

Closes #45
```

```
fix(backend): corrige timeout na execução de código Python

O timeout não estava sendo aplicado corretamente, causando
execuções infinitas em alguns casos.

Fixes #67
```

## Adicionando Novas Funcionalidades

### Adicionando um Novo Tipo de Nó

1. **Frontend**:
   - Crie um novo componente em `workflow-automation/src/components/`
   - Registre o componente em `nodeTypes` no `WorkflowEditor.jsx`
   - Adicione um botão na paleta de nós
   - Adicione testes para o componente

2. **Backend**:
   - Adicione lógica de execução em `workflow_executor.py`
   - Atualize a documentação da API
   - Adicione testes para a nova funcionalidade

### Adicionando uma Integração

1. **Instale as dependências necessárias**:
   ```bash
   # Backend
   cd workflow-backend
   source venv/bin/activate
   pip install nome-da-biblioteca
   pip freeze > requirements.txt
   ```

2. **Crie um serviço**:
   ```python
   # workflow-backend/src/services/nome_servico.py
   class NomeServico:
       def __init__(self, api_key):
           self.api_key = api_key
       
       def executar_acao(self, params):
           # Implementação
           pass
   ```

3. **Integre com o executor**:
   ```python
   # Em workflow_executor.py
   def _execute_action(self, node_data):
       if node_data['label'] == 'Nova Ação':
           servico = NomeServico(api_key)
           return servico.executar_acao(node_data)
   ```

4. **Atualize a documentação** no README

## Testes

### Frontend

```bash
cd workflow-automation
pnpm test
```

### Backend

```bash
cd workflow-backend
source venv/bin/activate
pytest
```

## Documentação

Ao adicionar novas funcionalidades, certifique-se de atualizar:

- README.md (se aplicável)
- ARCHITECTURE.md (para mudanças arquiteturais)
- Comentários no código
- Docstrings (Python)
- JSDoc (JavaScript)

## Processo de Review

Todos os Pull Requests passarão por review antes de serem merged. O processo inclui:

1. **Revisão de código**: Verificação de qualidade e aderência às convenções
2. **Testes**: Garantir que todos os testes passam
3. **Documentação**: Verificar se a documentação foi atualizada
4. **Funcionalidade**: Testar a funcionalidade adicionada/corrigida

## Código de Conduta

Este projeto adere a um código de conduta de colaboração respeitosa. Ao participar, você concorda em:

- Ser respeitoso com outros colaboradores
- Aceitar críticas construtivas
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros da comunidade

## Dúvidas?

Se você tiver dúvidas sobre como contribuir, sinta-se à vontade para:

- Abrir uma issue com a tag `question`
- Entrar em contato através do GitHub

Obrigado por contribuir! 🎉

