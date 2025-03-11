package models

import "database/sql"

type Brand struct {
	ID   int
	Name string
}

func GetAllBrand(db *sql.DB) ([]Brand, error) {
	rows, err := db.Query("SELECT id, nome FROM marcas")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var brands []Brand
	for rows.Next() {
		var b Brand
		if err := rows.Scan(&b.ID, &b.Name); err != nil {
			return nil, err
		}
		brands = append(brands, b)
	}

	return brands, nil
}
