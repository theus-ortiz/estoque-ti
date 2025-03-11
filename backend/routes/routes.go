package routes

import (
	"database/sql"
	"net/http"

	"github.com/theus-ortiz/estoque-ti-backend/controllers"
)

func SetupRoutes(router *http.ServeMux, db *sql.DB) {
	router.HandleFunc("/api/products", controllers.ListProducts(db))
	router.HandleFunc("/api/types", controllers.ListTypes(db))
    router.HandleFunc("/api/brands", controllers.ListBarnds(db))
	router.HandleFunc("/api/locals", controllers.ListLocals(db))
}
