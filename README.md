
⚙️ Workflow Automation System
Sistema visual de automação de tarefas com React e Flask

🔗 Acesse o Projeto
- 🌐 Versão Online: workflow-automation-system
- 💻 Repositório GitHub: github.com/MarcioGil/workflow-automation-system

🧭 Descrição Geral
O Workflow Automation System é uma plataforma visual que permite criar e executar fluxos de trabalho personalizados, conectando ações, condições e blocos de código de forma intuitiva.
Desenvolvido por Márcio Gil, estudante de Engenharia de Software, o projeto tem como objetivo aplicar conceitos de arquitetura full stack e integração entre frontend e backend.
Inspirado em ferramentas como n8n, Node-RED e Zapier, o sistema foca em educação, experimentação e aprendizado técnico contínuo.

🧩 Como Funciona
- O usuário monta fluxos de automação visualmente com blocos drag and drop usando React Flow.
- Cada nó representa uma ação (ex: código Python, execução JS, decisão lógica).
- Ao clicar em Executar, o frontend envia o fluxo (JSON) para o backend Flask.
- O Flask processa os blocos em subprocessos isolados, garantindo segurança.
- Os resultados são retornados ao frontend e exibidos dinamicamente na interface.

```text
Arquitetura do Projeto workflow-automation-system/
│
├── backend/ # Aplicação Flask (API REST)
│ ├── app.py # Ponto de entrada principal do servidor
│ ├── routes/ # Rotas e controladores da API
│ ├── services/ # Lógica de execução e integração
│ ├── models/ # Definição de dados e banco (SQLAlchemy)
│ ├── utils/ # Funções auxiliares (logs, validação, etc.)
│ └── requirements.txt # Dependências do backend
│
├── frontend/ # Aplicação React (interface visual)
│ ├── src/
│ │ ├── components/ # Componentes reutilizáveis (Editor, Sidebar, Node)
│ │ ├── pages/ # Páginas principais da interface
│ │ ├── hooks/ # Hooks personalizados
│ │ ├── services/ # Comunicação com o backend via Axios
│ │ ├── App.js # Estrutura e rotas principais
│ │ └── index.js # Ponto de entrada do React
│ ├── package.json # Dependências do frontend
│ └── README.md
│
├── docs/ # Imagens e documentação
│ ├── screenshots/
│ └── editor.png
│
└── README.md # Documentação principal do projeto
```




🧠 Aprendizados
Durante o desenvolvimento, aprendi a:
- Integrar React com Flask via API REST.
- Criar interfaces visuais com React Flow.
- Executar código dinâmico com segurança em subprocessos.
- Estruturar um projeto modular entre client e server.
- Publicar o frontend no GitHub Pages e gerenciar deploys.
- Valorizar a documentação e organização de código para portfólio.

💡 Próximos Passos
- Implementar autenticação com JWT
- Salvar workflows por usuário no banco de dados
- Adicionar blocos condicionais (if/else)
- Integrar com APIs externas (e-mail, Telegram, Notion)
- Fazer deploy do backend no Render ou Railway

💬 Autor
Márcio Alexandre de Paiva Gil
🎓 Estudante de Engenharia de Software
💻 Apaixonado por tecnologia, educação e automação inteligente
📍 Rio de Janeiro, Brasil
- 📧 Email: marciogil.dev@gmail.com
- 🌐 Portfólio: meu-portfolio_profissional

📝 Licença
Este projeto está sob a licença MIT — sinta-se à vontade para estudar, modificar e contribuir.
