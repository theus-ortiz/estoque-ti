package routes

import (
	"database/sql"
	"net/http"
	"strings"

	"github.com/theus-ortiz/estoque-ti-backend/controllers"
)

func SetupRoutes(router *http.ServeMux, db *sql.DB) {
	router.HandleFunc("/api/products", controllers.ListProducts(db))
	
	// Rota para listar e criar tipos
	router.HandleFunc("/api/types", handleTypesEndpoint(db))
	
	// Rota específica para operações em um tipo por ID
	router.HandleFunc("/api/types/", handleTypeByIDEndpoint(db))
	
	router.HandleFunc("/api/brands", controllers.ListBrands(db))
	router.HandleFunc("/api/locations", controllers.ListLocals(db))
}

// Função auxiliar para lidar com diferentes métodos HTTP no endpoint /api/types
func handleTypesEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Verificar se a URL é exatamente /api/types
		if r.URL.Path != "/api/types" {
			http.NotFound(w, r)
			return
		}
		
		switch r.Method {
		case http.MethodGet:
			controllers.ListTypes(db)(w, r)
		case http.MethodPost:
			controllers.CreateType(db)(w, r)
		case http.MethodOptions:
			// Configurar cabeçalhos CORS para preflight
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.WriteHeader(http.StatusOK)
		default:
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	}
}

// Função para lidar com operações em um tipo específico por ID
func handleTypeByIDEndpoint(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Verificar se a URL começa com /api/types/
		if !strings.HasPrefix(r.URL.Path, "/api/types/") {
			http.NotFound(w, r)
			return
		}
		
		// Extrair o ID do tipo da URL
		pathParts := strings.Split(r.URL.Path, "/")
		if len(pathParts) != 4 {
			http.NotFound(w, r)
			return
		}
		
		// O ID está na posição 3 (após /api/types/)
		// Agora podemos processar as operações específicas por ID
		switch r.Method {
		case http.MethodGet:
			controllers.GetType(db)(w, r)
		case http.MethodPut:
			controllers.UpdateType(db)(w, r)
		case http.MethodDelete:
			controllers.DeleteType(db)(w, r)
		case http.MethodOptions:
			// Configurar cabeçalhos CORS para preflight
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.WriteHeader(http.StatusOK)
		default:
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	}
}