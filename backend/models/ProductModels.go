package models

import (
    "database/sql"
)

type Product struct {
    ID       int    `json:"Produtos_Id"`
    Type     string `json:"Tipo_Nome"`
    Brand    string `json:"Marca_Nome"`
    Local    string `json:"Local"`
    Quantity int    `json:"Qtd_Total"`
}

// GetAllProducts retorna uma lista de produtos paginada e o total de produtos
func GetAllProducts(db *sql.DB, page, limit int) ([]Product, int, error) {
    offset := (page - 1) * limit

    // Query para obter os produtos paginados
    query := `
        SELECT
            produtos.id as Produtos_Id,
            tipos.nome as Tipo_Nome, 
            marcas.nome as Marca_Nome, 
            CONCAT(setores.nome, " - ", filiais.nome) as Local, 
            (inventarios.novo + inventarios.usado) as Qtd_Total 
        FROM produtos 
        INNER JOIN tipos ON produtos.tipo_id = tipos.id 
        INNER JOIN marcas ON produtos.marca_id = marcas.id 
        INNER JOIN setores ON produtos.setor_id = setores.id 
        INNER JOIN filiais ON setores.filial_id = filiais.id 
        INNER JOIN inventarios ON produtos.id = inventarios.produto_id
        LIMIT ? OFFSET ?;
    `
    rows, err := db.Query(query, limit, offset)
    if err != nil {
        return nil, 0, err
    }
    defer rows.Close()

    var products []Product
    for rows.Next() {
        var p Product
        if err := rows.Scan(&p.ID, &p.Type, &p.Brand, &p.Local, &p.Quantity); err != nil {
            return nil, 0, err
        }
        products = append(products, p)
    }

    // Query para obter o total de produtos
    var total int
    countQuery := `SELECT COUNT(*) FROM produtos`
    err = db.QueryRow(countQuery).Scan(&total)
    if err != nil {
        return nil, 0, err
    }

    return products, total, nil
}