package routes

import (
    "net/http"
    "database/sql"
    "github.com/theus-ortiz/estoque-ti-backend/controllers"
)

func SetupRoutes(router *http.ServeMux, db *sql.DB) {
    router.HandleFunc("/api/products", controllers.ListProducts(db))
}