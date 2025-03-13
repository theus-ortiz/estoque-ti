package controllers

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"

	"github.com/theus-ortiz/estoque-ti-backend/models"
)

func ListTypes(db *sql.DB) http.HandlerFunc {
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

		types, total, err := models.GetAllTypes(db, page, limit)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Retornar a resposta com os tipos e o total
		response := map[string]interface{}{
			"types": types,
			"total": total,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func GetType(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Extrair o ID do tipo da URL
		path := r.URL.Path
		parts := strings.Split(path, "/")
		if len(parts) < 4 {
			http.Error(w, "ID não fornecido", http.StatusBadRequest)
			return
		}
		
		id, err := strconv.Atoi(parts[3])
		if err != nil {
			http.Error(w, "ID inválido", http.StatusBadRequest)
			return
		}
		
		// Buscar o tipo pelo ID
		typeObj, err := models.GetTypeByID(db, id)
		if err != nil {
			http.Error(w, "Tipo não encontrado", http.StatusNotFound)
			return
		}
		
		// Retornar o tipo
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(typeObj)
	}
}

func CreateType(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Verificar se é um método POST
		if r.Method != http.MethodPost {
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
			return
		}

		// Configurar cabeçalhos CORS para permitir requisições do frontend
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Lidar com requisições OPTIONS (preflight)
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Ler o corpo da requisição
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Erro ao ler o corpo da requisição", http.StatusBadRequest)
			return
		}
		defer r.Body.Close()

		// Decodificar o JSON
		var input models.TypeInput
		if err := json.Unmarshal(body, &input); err != nil {
			http.Error(w, "Erro ao decodificar JSON", http.StatusBadRequest)
			return
		}

		// Validar o nome
		if input.Name == "" {
			http.Error(w, "O nome não pode estar vazio", http.StatusBadRequest)
			return
		}

		// Criar o tipo no banco de dados
		newType, err := models.CreateType(db, input.Name)
		if err != nil {
			http.Error(w, "Erro ao criar tipo: "+err.Error(), http.StatusInternalServerError)
			return
		}

		// Retornar o tipo criado
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(newType)
	}
}

func UpdateType(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Configurar cabeçalhos CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		
		// Lidar com requisições OPTIONS (preflight)
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		// Extrair o ID do tipo da URL
		path := r.URL.Path
		parts := strings.Split(path, "/")
		if len(parts) < 4 {
			http.Error(w, "ID não fornecido", http.StatusBadRequest)
			return
		}
		
		id, err := strconv.Atoi(parts[3])
		if err != nil {
			http.Error(w, "ID inválido", http.StatusBadRequest)
			return
		}
		
		// Ler o corpo da requisição
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Erro ao ler o corpo da requisição", http.StatusBadRequest)
			return
		}
		defer r.Body.Close()
		
		// Decodificar o JSON
		var input models.TypeInput
		if err := json.Unmarshal(body, &input); err != nil {
			http.Error(w, "Erro ao decodificar JSON", http.StatusBadRequest)
			return
		}
		
		// Validar o nome
		if input.Name == "" {
			http.Error(w, "O nome não pode estar vazio", http.StatusBadRequest)
			return
		}
		
		// Atualizar o tipo no banco de dados
		updatedType, err := models.UpdateType(db, id, input.Name)
		if err != nil {
			http.Error(w, "Erro ao atualizar tipo: "+err.Error(), http.StatusInternalServerError)
			return
		}
		
		// Retornar o tipo atualizado
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(updatedType)
	}
}

func DeleteType(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Configurar cabeçalhos CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		
		// Lidar com requisições OPTIONS (preflight)
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		// Extrair o ID do tipo da URL
		path := r.URL.Path
		parts := strings.Split(path, "/")
		if len(parts) < 4 {
			http.Error(w, "ID não fornecido", http.StatusBadRequest)
			return
		}
		
		id, err := strconv.Atoi(parts[3])
		if err != nil {
			http.Error(w, "ID inválido", http.StatusBadRequest)
			return
		}
		
		// Excluir o tipo do banco de dados
		err = models.DeleteType(db, id)
		if err != nil {
			http.Error(w, "Erro ao excluir tipo: "+err.Error(), http.StatusInternalServerError)
			return
		}
		
		// Retornar sucesso
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Tipo excluído com sucesso"})
	}
}

