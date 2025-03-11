package models

import "database/sql"

type Local struct {
	ID        int
	LocalName string
}

func GetAllLocals(db *sql.DB) ([]Local, error){
	querry := `
		SELECT setores.id,
		CONCAT(setores.nome, ' - ', filiais.nome) NomeLocal
		FROM setores
		INNER JOIN filiais
		ON setores.filial_id = filiais.id
	`

	rows, err := db.Query(querry)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var locals []Local
	for rows.Next() {
		var l Local
		if err := rows.Scan(&l.ID, &l.LocalName); err != nil {
			return nil, err
		}
		locals = append(locals, l)
	}

	return locals, nil
}
