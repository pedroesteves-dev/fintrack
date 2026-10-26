# fintrack
Personal finance management app built with React, TypeScript, React Native, and NestJS. Track income and expenses, monitor your balance, manage financial goals, and gain insights into your spending habits.

## Estrutura do projeto

```
fintrack/
├── apps/
│   ├── web/         # Front-end web (React + TypeScript)
│   └── mobile/      # Aplicativo mobile (React Native + Expo)
├── backend/         # Back-end (NestJS)
├── packages/
│   └── shared/      # Tipos e validações compartilhados
├── .gitignore
├── package.json     # Scripts para rodar web e backend juntos
└── README.md
```

## Como rodar

Requisitos: Node.js 24+ e npm.

```bash
# Instala as dependências da raiz, do backend e do front
npm run install:all

# Sobe a API (http://localhost:3000) e o front (http://localhost:5173)
npm run dev
```

Também é possível subir cada um separadamente com `npm run dev:api` e `npm run dev:web`.
