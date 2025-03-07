package db

import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
    "log"
)

// DB encapsula a conexão com o banco de dados
type DB struct {
    conn *sql.DB
}

// NewDB cria uma nova instância de DB e inicializa a conexão com o banco de dados
func NewDB() *DB {
    dsn := "root@tcp(localhost:3306)/br_edu?charset=utf8mb4&parseTime=True&loc=Local"

    conn, err := sql.Open("mysql", dsn)
    if err != nil {
        log.Fatal("Erro ao conectar ao banco de dados:", err)
    }

    // Testa a conexão
    if err := conn.Ping(); err != nil {
        log.Fatal("Erro ao testar a conexão com o banco de dados:", err)
    }

    log.Println("Conectado ao banco de dados MySQL!")
    return &DB{conn: conn}
}

// GetConn retorna a conexão com o banco de dados
func (db *DB) GetConn() *sql.DB {
    return db.conn
}

// Close fecha a conexão com o banco de dados
func (db *DB) Close() error {
    return db.conn.Close()
}