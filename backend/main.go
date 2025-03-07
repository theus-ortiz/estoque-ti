package main

import (
    "log"
    "net/http"
    "github.com/theus-ortiz/estoque-ti-backend/db"
    "github.com/theus-ortiz/estoque-ti-backend/routes"
    "github.com/rs/cors"
)

func main() {
    // Inicializar o banco de dados
    database := db.NewDB()
    defer database.Close() // Fecha a conexão com o banco de dados ao finalizar o programa

    // Configurar as rotas
    router := http.NewServeMux()
    routes.SetupRoutes(router, database.GetConn())

    // Configurar o CORS
    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:5173"}, // Permite solicitações do frontend
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Content-Type"},
        AllowCredentials: true,
    })

    // Iniciar o servidor com CORS
    handler := c.Handler(router)
    log.Println("Servidor rodando na porta 8080...")
    http.ListenAndServe(":8080", handler)
}