const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// banco com 10 registros
let livros = [
    { id: 1, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", ano: 1997 },
    { id: 2, titulo: "Harry Potter e a Câmara Secreta", autor: "J.K. Rowling", ano: 1998 },
    { id: 3, titulo: "Harry Potter e o Prisioneiro de Azkaban", autor: "J.K. Rowling", ano: 1999 },
    { id: 4, titulo: "Harry Potter e o Cálice de Fogo", autor: "J.K. Rowling", ano: 2000 },
    { id: 5, titulo: "Harry Potter e a Ordem da Fênix", autor: "J.K. Rowling", ano: 2003 },
    { id: 6, titulo: "A Sociedade do Anel", autor: "J.R.R. Tolkien", ano: 1954 },
    { id: 7, titulo: "As Duas Torres", autor: "J.R.R. Tolkien", ano: 1954 },
    { id: 8, titulo: "O Retorno do Rei", autor: "J.R.R. Tolkien", ano: 1955 },
    { id: 9, titulo: "Diário de um Banana", autor: "Jeff Kinney", ano: 2007 },
    { id: 10, titulo: "Diário de um Banana: Rodrick é o Cara", autor: "Jeff Kinney", ano: 2008 }
];

let idAtual = 11;

// GET todos
app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

// GET por ID
app.get('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    res.json(livro);
});

// POST
app.post('/livros', (req, res) => {
    const { titulo, autor, ano } = req.body;

    if (!titulo || titulo.trim() === '') {
        return res.status(400).json({ erro: "Título obrigatório" });
    }

    if (!autor || autor.trim() === '') {
        return res.status(400).json({ erro: "Autor obrigatório" });
    }

    if (!ano || typeof ano !== 'number' || ano <= 0) {
        return res.status(400).json({ erro: "Ano inválido" });
    }

    const novoLivro = {
        id: idAtual++,
        titulo,
        autor,
        ano
    };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
});

// PUT
app.put('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    const { titulo, autor, ano } = req.body;

    if (!titulo || !autor || typeof ano !== 'number') {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    livro.titulo = titulo;
    livro.autor = autor;
    livro.ano = ano;

    res.json(livro);
});

// DELETE
app.delete('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    livros.splice(index, 1);

    res.status(204).send();
});

// rota não encontrada
app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

// erro geral
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ erro: "Erro interno" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});