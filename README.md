# PathFinder

Plataforma web para cadastro e descoberta de locais e trilhas esportivas no Brasil. Permite que usuários se cadastrem, registrem pontos de interesse com CEP (convertidos automaticamente em coordenadas geográficas) e visualizem os locais no Google Maps.

---

## Funcionalidades

- Autenticação com JWT (login e cadastro de usuário)
- Cadastro de locais com geolocalização automática via CEP
- Listagem de todos os locais cadastrados na plataforma
- Edição e exclusão de locais próprios
- Visualização de locais no Google Maps
- Dashboard com contagem de usuários e locais
- Interface responsiva (desktop, tablet e celular)

---

## Tecnologias

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev/) | 18.3 | Biblioteca de UI |
| [Vite](https://vitejs.dev/) | 5.3 | Bundler e servidor de desenvolvimento |
| [React Router DOM](https://reactrouter.com/) | 6.25 | Roteamento de páginas |
| [Axios](https://axios-http.com/) | 1.7 | Requisições HTTP |
| [React Hook Form](https://react-hook-form.com/) | 7.52 | Gerenciamento de formulários |
| [React Icons](https://react-icons.github.io/react-icons/) | 5.2 | Ícones |
| [Bootstrap](https://getbootstrap.com/) | 5.3 | Base de estilos |

### Backend (repositório separado — [API_Trilha](../API_Trilha))
| Tecnologia | Uso |
|---|---|
| Node.js + Express | Servidor REST |
| PostgreSQL + Sequelize | Banco de dados relacional |
| JWT | Autenticação |
| bcrypt | Hash de senhas |
| Swagger | Documentação da API |

### APIs externas
| API | Uso |
|---|---|
| [ViaCEP](https://viacep.com.br/) | Busca de endereço pelo CEP |
| [Nominatim (OpenStreetMap)](https://nominatim.org/) | Conversão de endereço em lat/lng |
| Google Maps | Visualização do local no mapa |

---

## Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) v18 ou superior
- [npm](https://www.npmjs.com/) v9 ou superior (já vem com o Node)
- O backend **API_Trilha** rodando na porta `9000`

Para verificar se o Node está instalado:
```bash
node -v
npm -v
```

---

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/PathFinder.git
cd PathFinder/PATHFINDER
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a URL da API

Abra o arquivo `src/api/api.jsx` e confirme que a `baseURL` aponta para onde o backend está rodando:

```js
const api = axios.create({
  baseURL: 'http://localhost:9000',
});
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

---

## Scripts disponíveis

```bash
# Inicia o servidor de desenvolvimento com hot reload
npm run dev

# Gera a build de produção na pasta /dist
npm run build

# Pré-visualiza a build de produção localmente
npm run preview

# Executa o ESLint para verificar o código
npm run lint
```

---

## Estrutura do projeto

```
PATHFINDER/
├── public/
├── src/
│   ├── api/
│   │   └── api.jsx              # Instância do Axios com interceptor de token
│   ├── assets/                  # Imagens estáticas
│   ├── Components/
│   │   ├── AppRoutes.jsx        # Definição de rotas (públicas e protegidas)
│   │   ├── PrivateRoute.jsx     # Guarda de rota (exige autenticação)
│   │   └── Header/
│   │       ├── Header.jsx       # Sidebar de navegação + menu mobile
│   │       └── header.css
│   ├── Pages/
│   │   ├── Signin/              # Tela de login
│   │   ├── Signup/              # Tela de cadastro de usuário
│   │   ├── dashbord/home/       # Dashboard principal
│   │   ├── Locais/              # Listagem, cadastro e edição de locais
│   │   └── Usuarios/            # Listagem de usuários
│   ├── index.css                # Design tokens (CSS variables) + reset global
│   └── main.jsx                 # Ponto de entrada da aplicação
├── index.html
├── package.json
└── vite.config.js
```

---

## Rotas da aplicação

| Rota | Página | Autenticação |
|---|---|---|
| `/login` | Tela de login | Pública |
| `/cadastro` | Cadastro de usuário | Pública |
| `/` | Dashboard | Obrigatória |
| `/local` | Lista de locais | Obrigatória |
| `/cadastroLocal` | Cadastrar novo local | Obrigatória |
| `/editarLocal/:id` | Editar local | Obrigatória |
| `/usuarios` | Lista de usuários | Obrigatória |

---

## Principais endpoints consumidos

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/login` | Autenticação, retorna JWT |
| `POST` | `/usuario` | Cadastra usuário |
| `GET` | `/usuario` | Lista todos os usuários |
| `POST` | `/local` | Cria local (CEP → lat/lng) |
| `GET` | `/local` | Lista todos os locais |
| `GET` | `/local/:id` | Busca local por ID |
| `PUT` | `/local/:id` | Atualiza local |
| `DELETE` | `/local/:id` | Remove local |

> Todos os endpoints (exceto `/login` e `POST /usuario`) exigem o header:
> `Authorization: Bearer <token>`

---

## Autenticação

O token JWT é salvo no `localStorage` após o login e enviado automaticamente em todas as requisições via interceptor do Axios (`src/api/api.jsx`). Rotas protegidas redirecionam para `/login` caso o token não exista.

---

## Autora

**Taline Araujo** — [taline.araujo@hotmail.com](mailto:taline.araujo@hotmail.com)
