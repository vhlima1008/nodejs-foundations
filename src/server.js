import http from 'node:http'

// CRUD -> Create, Read, Update, Delete
// - Criar usuários
// - Listagem usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
// -> Metodo HTTP: POST, GET, PUT/PATCH, DELETE
// -> URL

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso do back-end
// PATCH => Atualizar um recurso específico do back-end
// DELETE => Deletar um recurso do back-end

// Metodo HTTP + URL => significado e caminho
// -> GET /users => Busca usuários
// -> POST /users => Cria usuário

// Stateful != Stateless
// Stateful -> Salva dados de memória em tempo de execução em uma memória virtual
// Stateless -> Salva dos dados somente em uma memória externa permanente

// JSON -> JavaScript Object Notation

// Cabeçalhos -> (Req/Res) => Metadados passados para interpretar

const users = []

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
        })
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(8080)