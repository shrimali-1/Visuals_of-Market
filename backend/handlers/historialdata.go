package handlers

import (
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type HistoricalData struct {
	l *log.Logger
}

func (h *HistoricalData) GetHistorialData(rw http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()

	symbol := params.Get("symbol")
	from_date := params.Get("from_date")
	to_date := params.Get("to_date")

	if symbol == "" || from_date == "" || to_date == "" {
		h.l.Println("Missing required Parameters")
		http.Error(rw, "[ERROR] Missing required Parameters", http.StatusBadRequest)
	}

	fmt.Println(symbol, from_date, to_date)
	allData := data.GetData(symbol, from_date, to_date)
	rw.Header().Set("Content-Type", "application/json")
	err := allData.ToJSON(rw)

	if err != nil {
		h.l.Println("[ERROR] converting retrieve data to json")
	}
	// Debugging
	// fmt.Fprintf(rw, "symbol %s from_data %s to_data %s", symbol, from_data, to_data)
}

func NewHistorialData(l *log.Logger) *HistoricalData {
	return &HistoricalData{l}
}
