⚙️ Workflow Automation System

Sistema Visual de Automação de Tarefas com React e Flask


🔗 Acesse o Projeto

🌐 Versão Online: https://marciogil.github.io/workflow-automation-system/

💻 Repositório no GitHub: https://github.com/MarcioGil/workflow-automation-system

🧭 Descrição Geral

O Workflow Automation System é um sistema visual de automação de tarefas que permite ao usuário criar e executar fluxos de trabalho personalizados, conectando ações, condições e blocos de código de maneira intuitiva.

O projeto foi desenvolvido por Márcio Gil, estudante de Engenharia de Software, como parte de seu processo de aprendizado prático em arquitetura full stack e integração entre frontend e backend.

Inspirado em ferramentas como n8n, Node-RED e Zapier, o sistema foi construído com foco em educação, experimentação e aprendizado técnico contínuo.

🧩 Como o Sistema Funciona

O usuário monta fluxos de automação visualmente, usando blocos “drag and drop” no React Flow.

Cada nó representa uma ação (ex: código Python, execução JS, decisão lógica).

Ao clicar em Executar, o frontend envia o fluxo (em formato JSON) para o backend Flask.

O Flask processa e executa os blocos em subprocessos isolados, garantindo segurança.

Os resultados são retornados ao frontend e exibidos dinamicamente na interface.

Arquitetura do Projeto workflow-automation-system/
│
├── backend/                          # Aplicação Flask (API REST)
│   ├── app.py                        # Ponto de entrada principal do servidor
│   ├── routes/                       # Rotas e controladores da API
│   ├── services/                     # Lógica de execução e integração
│   ├── models/                       # Definição de dados e banco (SQLAlchemy)
│   ├── utils/                        # Funções auxiliares (logs, validação, etc.)
│   └── requirements.txt              # Dependências do backend
│
├── frontend/                         # Aplicação React (interface visual)
│   ├── src/
│   │   ├── components/               # Componentes reutilizáveis (Editor, Sidebar, Node)
│   │   ├── pages/                    # Páginas principais da interface
│   │   ├── hooks/                    # Hooks personalizados
│   │   ├── services/                 # Comunicação com o backend via Axios
│   │   ├── App.js                    # Estrutura e rotas principais
│   │   └── index.js                  # Ponto de entrada do React
│   ├── package.json                  # Dependências do frontend
│   └── README.md
│
├── docs/                             # Imagens e documentação
│   ├── screenshots/
│   └── editor.png
│
└── README.md                         # Documentação principal do projeto



🧠 Aprendizados e Objetivos

Durante o desenvolvimento deste projeto, aprendi a:

Integrar React (frontend) com Flask (backend) via API REST.

Criar interfaces visuais com React Flow.

Executar código dinâmico em subprocessos isolados com segurança.

Organizar uma estrutura modular entre client e server.

Publicar o frontend no GitHub Pages e gerenciar deploys.

Além disso, compreendi a importância da documentação, clareza na arquitetura e versão de código organizada para um portfólio profissional.

💡 Próximos Passos

 Implementar autenticação de usuários com JWT.

 Salvar workflows no banco por usuário.

 Adicionar blocos condicionais (if/else).

 Permitir integração com APIs externas (e-mail, Telegram, Notion).

 Deploy do backend no Render ou Railway.

💬 Autor

👤 Márcio Alexandre de Paiva Gil
🎓 Estudante de Engenharia de Software
💻 Apaixonado por tecnologia, educação e automação inteligente.
📍 Rio de Janeiro, Brasil

📧 Contato: marciogil.dev@gmail.com

🌐 Portfólio: https://marciogil.github.io/meu-portfolio_profissional

📝 Licença

Este projeto está sob a licença MIT — sinta-se à vontade para estudar, modificar e contribuir.