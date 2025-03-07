package models

import (
    "database/sql"
)

type Product struct {
    ID       int    `json:"id"`
    Name     string `json:"name"`
    Type     string `json:"type"`
    Brand    string `json:"brand"`
    Quantity int    `json:"quantity"`
}

func GetAllProducts(db *sql.DB) ([]Product, error) {
    rows, err := db.Query("SELECT id, tipo_id, unidade_id, marca_id, setor_id FROM produtos")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var products []Product
    for rows.Next() {
        var p Product
        if err := rows.Scan(&p.ID, &p.Name, &p.Type, &p.Brand, &p.Quantity); err != nil {
            return nil, err
        }
        products = append(products, p)
    }

    return products, nil
}