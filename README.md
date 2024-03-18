## Executando o projeto

Para executar o projeto, você precisa definir o token da API The Movie DB no arquivo `.env`.

Defina seu token da API The Movie DB atribuindo-o à variável `VITE_TOKEN_API_THEMOVIEDB`, como mostrado abaixo:

```bash
VITE_TOKEN_API_THEMOVIEDB=sua_chave_de_acesso_aqui
```

## Comandos

- Executar a API fake (`porta 3000`)
```bash
yarn fake:api
```

- Subir a aplicação web em `http://localhost:5173`
```bash
yarn dev
```

- Executar os testes sem `watch mode`
```bash
yarn test
```

- Executar os testes no `watch mode`
```bash
yarn test:dev
```

- Relatório de cobertura de testes ([Istanbul](https://istanbul.js.org/))
```bash
yarn coverage
```

## Bibliotecas e Linguagens 

- **Typescript**: Aumenta a segurança e robustez do código.

- **Storybook**: Integrado para documentar páginas e componentes de forma eficiente, facilitando visualização e colaboração na equipe.

- **Tailwind CSS**: Configurado pela abordagem de estilo baseada em classes, oferecendo flexibilidade e agilidade no desenvolvimento da interface. Contudo, está desabilitado pois no `index.css` uma vez que não achei necessário utilizar no andamento do projeto:

```ts
/* @tailwind base;
@tailwind components;
@tailwind utilities; */'
```

- **Yarn**: Preferência pessoal e pela melhor resolução de dependências.

- **Redux**: Implementado para gerenciar o estado da aplicação.

- **Redux Persist**: Embora não necessite para esse projeto que não existe nenhum dado que necessita dessa dependencia mas configurei junto.

- **Ramda**: Adotado pela facilidade na manipulação de dados de forma imutável e composição de funções.

- **Formik**: Embora nao necessitasse de utilizar no projeto por ter somente um input criado e um formulario, torna-se mais eficaz na manipulação de formulários, mesmo em projetos com poucos elementos.

- **Yup**: Integrado ao Formik para validação de esquemas, aumentando a segurança dos dados do formulário.

- **Axios Mock Adapter**: Utilizado para facilitar testes de classes de API, simulando solicitações HTTP durante o desenvolvimento e testes unitários.

## Storybook

### Configurações do Tema e do Storybook

Para garantir uma experiência visual consistente com o tema escuro que estamos utilizando, fizemos algumas personalizações no Storybook. Aqui está o que foi feito:

1. **Tema Personalizado**: Como estamos utilizando um tema escuro, ajustamos as configurações do Storybook para incorporar o tema escuro. Isso foi alcançado configurando o `ThemeProvider` em `.storybook/preview.tsx`, permitindo que o Storybook utilize as estilizações do nosso tema.

2. **Fundo Padrão**: Por padrão, o Storybook utiliza um fundo branco. Para corresponder ao tema escuro, adicionamos um fundo escuro como padrão para o Storybook. Isso garante uma experiência visual consistente com o restante do aplicativo.

### Resolução de Problemas

Observamos uma questão específica ao tentar executar o Yarn 1 com nossas configurações atuais. Isso foi resolvido adicionando uma resolução específica no `package.json`. Aqui está o que foi feito:

```json
"resolutions": {
    "jackspeak": "2.1.1"
}
```

Essa resolução específica aborda o problema mencionado, permitindo que o Yarn 1 seja executado sem problemas com nossas configurações atuais.

Essas personalizações e resoluções garantem que nosso Storybook funcione perfeitamente e ofereça uma experiência de desenvolvimento consistente e eficiente.


## Arquitetura e Padrões do Projeto: 

### Utilização Estratégica do Componente `*Container.tsx`

O componente *Container.tsx* proporcionando uma organização eficaz e uma clara separação de responsabilidades. No entanto, é importante reconhecer que o uso inadequado deste componente pode acarretar em consequências não desejadas.

#### Aspectos Positivos:

- **Abstração de Lógica**: O `*Container.tsx` permite a separação limpa entre a lógica de apresentação e a lógica de negócios, facilitando a manutenção e o entendimento do código.

- **Reusabilidade Aprimorada**: Ao encapsular funcionalidades específicas dentro do `*Container.tsx`, promove-se a reutilização de código de forma eficiente, contribuindo para um desenvolvimento mais ágil e escalável.

- **Escalabilidade e Flexibilidade**: A adoção do `*Container.tsx` prepara o sistema para enfrentar mudanças e evoluções futuras, garantindo uma adaptação mais suave a novos requisitos e cenários.

#### Consequências Negativas:

**Proliferação de Props**: A utilização excessiva de `*Container.tsx` pode levar à multiplicação de props, tornando a interface de componente confusa e difícil de manter. Isso pode dificultar a compreensão do fluxo de dados dentro do aplicativo, aumentando a complexidade do código.

**Possíveis Problemas de Desempenho**: Se não forem tratados adequadamente, o uso inadequado dos hooks do React dentro de `*Container.tsx` pode resultar em problemas de desempenho durante a renderização. Ciclos de renderização desnecessários ou atualizações excessivas do componente podem afetar negativamente a experiência do usuário.

### Abstração da Camada de Serviços com o Hook Especializado da Classe Api

A arquitetura proposta também inclui a função criarInstanciaAxios, responsável por configurar instâncias do Axios para duas bases de URLs diferentes. Essa função é crucial para o funcionamento do hook especializado da classe Api, pois permite a comunicação eficiente com os servidores correspondentes. Ao encapsular a lógica de criação de instâncias do Axios, essa abordagem contribui para a modularidade do código e facilita a manutenção, garantindo que a configuração da comunicação com as APIs seja centralizada e fácil de gerenciar.


## Decisões sobre o desafio

- **Ajustes de UX/UI**: Foram realizados ajustes nas informações e layout da página, incluindo a adição de novas seções, como o menu de navegação, para melhorar a usabilidade da aplicação. Considerações foram feitas especialmente para dispositivos móveis, como a redução do tamanho dos assentos e a reorganização da sinopse e da foto para melhor adaptação em telas menores.
- **Utilização do Figma**: O Figma foi utilizado conforme solicitado, sendo que o componente de TopBar foi modificado em toda a aplicação para garantir consistência visual.
- **Implementação do Bônus**: Para a etapa bônus, optei por utilizá-la em uma única página. No entanto, como a api necessitava especificamente de um token Bearer, configurei-o de forma global, possibilitando o uso em outros endpoints e em diferentes telas. Além disso, considerei interessante aproveitar as informações do JSON Server em conjunto com a API 
- **Adoção de Princípios e Testes**: Foram seguidos os princípios de desenvolvimento e realizados testes sempre que possível, visando garantir a qualidade e robustez da aplicação.
- **Migração para TypeScript**: Não considero de forma alguma a possibilidade de manter o código em JavaScript puro, devido aos problemas críticos decorrentes da falta de tipagem.
