import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
import fastifyCors from 'fastify-cors';


const server = fastify()
const database = new DatabasePostgres()

// Habilita o CORS para todas as rotas
server.register(fastifyCors, {
    origin: '*', // Permite todas as origens. Ajuste conforme necessário.
  });

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.post('/videos', async (request, reply) => {
    const { title, description, duration }= request.body

     await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration }= request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})


const port = process.env.PORT || 3333;

server.listen({ port, host: '0.0.0.0' }, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});

// server.listen({
//     port: process.env.PORT ?? 3333,
// })