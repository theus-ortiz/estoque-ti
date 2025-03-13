package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/rs/cors"
	"github.com/theus-ortiz/estoque-ti-backend/db"
	"github.com/theus-ortiz/estoque-ti-backend/routes"
)

func main() {
	// Inicializar o banco de dados
	database := db.NewDB()
	defer database.Close()

	// Obter a conexão com o banco de dados
	dbConn := database.GetConn()

	// Criar um novo roteador
	mux := http.NewServeMux()

	// Configurar as rotas
	routes.SetupRoutes(mux, dbConn)

	// Configurar CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		Debug:            true, // Habilitar logs de debug para CORS
	})

	// Envolver o roteador com o middleware CORS
	handler := c.Handler(mux)

	// Adicionar middleware para logging de requisições
	loggingHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Requisição recebida: %s %s", r.Method, r.URL.Path)
		handler.ServeHTTP(w, r)
	})

	// Iniciar o servidor
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Porta padrão
	}
	
	fmt.Printf("Servidor iniciado na porta %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, loggingHandler))
}