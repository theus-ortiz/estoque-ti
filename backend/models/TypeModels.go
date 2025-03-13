package models

import "database/sql"

type Types struct {
	ID   int    `json:"Tipo_Id"`
	Name string `json:"Tipo_Nome"`
}

// Estrutura para receber os dados do POST
type TypeInput struct {
	Name string `json:"name"`
}

func GetAllTypes(db *sql.DB, page, limit int) ([]Types, int, error) {
	offset := (page - 1) * limit

	query := `
		SELECT id, nome FROM tipos
		LIMIT ? OFFSET ?;
	`

	rows, err := db.Query(query, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var types []Types
	for rows.Next() {
		var t Types
		if err := rows.Scan(&t.ID, &t.Name); err != nil {
			return nil, 0, err
		}
		types = append(types, t)
	}

	var total int
	countQuery := `SELECT COUNT(*) FROM tipos`
	err = db.QueryRow(countQuery).Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	return types, total, nil
}

// Função para obter um tipo específico pelo ID
func GetTypeByID(db *sql.DB, id int) (Types, error) {
	query := `SELECT id, nome FROM tipos WHERE id = ?`
	
	var t Types
	err := db.QueryRow(query, id).Scan(&t.ID, &t.Name)
	if err != nil {
		return Types{}, err
	}
	
	return t, nil
}

// Função para criar um tipo
func CreateType(db *sql.DB, name string) (Types, error) {
	query := `INSERT INTO tipos (nome) VALUES (?)`
	
	result, err := db.Exec(query, name)
	if err != nil {
		return Types{}, err
	}
	
	id, err := result.LastInsertId()
	if err != nil {
		return Types{}, err
	}
	
	return Types{
		ID:   int(id),
		Name: name,
	}, nil
}

// Função para atualizar um tipo
func UpdateType(db *sql.DB, id int, name string) (Types, error) {
	query := `UPDATE tipos SET nome = ? WHERE id = ?`
	
	_, err := db.Exec(query, name, id)
	if err != nil {
		return Types{}, err
	}
	
	return Types{
		ID:   id,
		Name: name,
	}, nil
}

// Função para excluir um tipo
func DeleteType(db *sql.DB, id int) error {
	query := `DELETE FROM tipos WHERE id = ?`
	
	_, err := db.Exec(query, id)
	return err
}

