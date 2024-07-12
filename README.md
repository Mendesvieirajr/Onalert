# OnAlert

OnAlert é uma aplicação móvel desenvolvida para fornecer ferramentas essenciais em situações de emergência. Inspirado pelo princípio de prudência, o projeto visa melhorar a preparação e a resposta a desastres naturais e outras crises. A aplicação oferece funcionalidades como registros médicos, botão de emergência rápida, mensagens de alerta, detecção automática de localização  e gestão de uma lista de contactos de emergência.

## Funcionalidades Principais

- **Registros Médicos**: Permite armazenar e gerenciar informações médicas.
- **Botão de Emergência Rápida**: Inicia automaticamente uma chamada para os serviços de emergência locais.
- **Mensagens Alerta**: Envie mensagem aos seus contatos sobre situações de emergência iminentes na seu local.
- **Detecção Automática de Localização**: Atualiza a sua localização em tempo real, estando pronto para enviar em caso de emergencia.
- **Gestão de Contactos de Emergência**: Uma lista atualizada dos seus contactos de emergência.

## Requisitos

- Node.js
- Expo CLI
- MySQL

## Instalação

1. Clone o repositório:
    ```
    git clone https://github.com/Mendesvieirajr/OnAlert.git
    cd OnAlert
    ```
2. Instale as dependências:
    ```
    npm install
    ```
3. Configure o banco de dados MySQL e as variáveis de ambiente no arquivo `.env`.

## Utilização

1. Inicie o servidor:
    ```
    npm run server
    ```
2. Inicie a aplicação Expo:
    ```
    expo start
    ```

## Estrutura do Projeto

Abaixo está a estrutura do projeto OnAlert:


OnAlert/
├── .expo
├── .idea
├── android
├── assets
├── ios
├── node_modules
├── prisma
├── src
│ ├── components
│ │ └── EmergencyButton.tsx
│ ├── constants
│ │ ├── Colors.ts
│ │ └── styles.ts
│ ├── context
│ │ └── AuthContext.tsx
│ ├── navigation
│ │ └── AppNavigator.tsx
│ ├── screens
│ │ ├── EmergencyContactsScreen.tsx
│ │ ├── HomeScreen.tsx
│ │ ├── LoginScreen.tsx
│ │ ├── MedicalRecordsScreen.tsx
│ │ ├── ProfileScreen.tsx
│ │ ├── SignupScreen.tsx
│ │ └── TOSScreen.tsx
│ ├── services
│ │ └── api.js
│ └── types
│ └── index.ts
├── uploads
├── .env
├── .gitignore
├── app.json
├── App.tsx
├── babel.config.js
├── package-lock.json
├── package.json
├── server.js
└── tsconfig.json


## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicações móveis.
- **Expo**: Ferramenta e serviço para construção de aplicações React Native.
- **Node.js**: Ambiente de execução para JavaScript.
- **MySQL**: Sistema de gerenciamento de banco de dados.
- **Prisma**: Ferramenta ORM para Node.js.
- **Axios**: Cliente HTTP para realizar chamadas API.
- **Expo Secure Store**: Armazenamento seguro de dados.
- **DateTimePicker**: Seleção de datas.
- **ImagePicker**: Seleção de imagens.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`).
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`).
4. Faça o push para a branch (`git push origin feature/AmazingFeature`).
5. Abra um Pull Request.

## Contato

- **Nome**: Martim Vieira
- **Email**: on.alertbot@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/martim-vieira/

## Agradecimentos Especiais

- Aos meus pais pelo apoio e ideias.
- Professor Pedro Furtunato pelo Logotipo.
- Outros docentes pela orientação.


![Logo_Martim](https://github.com/Mendesvieirajr/Onalert/assets/108261885/e63616d4-3ebb-4113-827d-6a75f44057b5)
