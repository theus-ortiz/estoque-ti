package controllers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/theus-ortiz/estoque-ti-backend/models"
)

func ListBrands(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		types, err := models.GetAllBrand(db)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(types)
	}
}
