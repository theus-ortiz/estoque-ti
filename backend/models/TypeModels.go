package models

import "database/sql"

type Types struct {
	ID   int
	Name string
}

func GetAllTypes(db *sql.DB) ([]Types, error) {
	rows, err := db.Query("SELECT id, nome FROM tipos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var types []Types
	for rows.Next() {
		var t Types
		if err := rows.Scan(&t.ID, &t.Name); err != nil {
			return nil, err
		}
		types = append(types, t)
	}

	return types, nil
}
