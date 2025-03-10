package models

import (
    "database/sql"
)

type Product struct {
    ID       int    `json:"Produtos_Id"`
    Type     string `json:"Tipo_Nome"`
    Brand     string `json:"Marca_Nome"`
    Local    string `json:"Local"`
    Quantity int    `json:"Qtd_Total"`
}

func GetAllProducts(db *sql.DB) ([]Product, error) {
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
        INNER JOIN inventarios ON produtos.id = inventarios.produto_id;
    `
    rows, err := db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var products []Product
    for rows.Next() {
        var p Product
        if err := rows.Scan(&p.ID, &p.Type, &p.Brand, &p.Local, &p.Quantity); err != nil {
            return nil, err
        }
        products = append(products, p)
    }

    return products, nil
}