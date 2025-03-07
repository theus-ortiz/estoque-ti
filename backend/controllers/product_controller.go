package controllers

import (
    "encoding/json"
    "net/http"
    "github.com/theus-ortiz/estoque-ti-backend/models"
    "database/sql"
)

func ListProducts(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        products, err := models.GetAllProducts(db)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(products)
    }
}