package controllers

import (
    "encoding/json"
    "net/http"
    "strconv"
    "github.com/theus-ortiz/estoque-ti-backend/models"
    "database/sql"
)

func ListProducts(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Obter os parâmetros da query string
        pageStr := r.URL.Query().Get("page")
        limitStr := r.URL.Query().Get("limit")

        // Definir valores padrão para page e limit
        page, err := strconv.Atoi(pageStr)
        if err != nil || page < 1 {
            page = 1
        }

        limit, err := strconv.Atoi(limitStr)
        if err != nil || limit < 1 {
            limit = 8 // Valor padrão de itens por página
        }

        // Obter os produtos paginados
        products, total, err := models.GetAllProducts(db, page, limit)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        // Retornar a resposta com os produtos e o total
        response := map[string]interface{}{
            "products": products,
            "total":    total,
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
    }
}