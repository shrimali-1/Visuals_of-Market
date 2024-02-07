package data

import (
	"encoding/json"
	"fmt"
	"io"

	"github.com/ArshpreetS/true-beacon-backend/utility"
	_ "github.com/go-sql-driver/mysql"
	// "github.com/ArshpreetS/true-beacon-backend/utility"
)

type dataEntry struct {
	ID     int    `json:"id"`
	Date   string `json:"date"`
	Price  int    `json:"price"`
	Symbol string `json:"-"`
}

type HistoricalData []*dataEntry

func (h *HistoricalData) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(h)
}

func GetData(symbol string, from_date string, to_date string) HistoricalData {
	utility.InitializeMySQL()
	db_conn := utility.GetMySQLConnection()

	query := "Select * from historical_data where date BETWEEN ? and ? and symbol = ?"
	stmt, err := db_conn.Prepare(query)
	if err != nil {
		fmt.Println("[ERROR] Failed preparing query")
		panic(err)
	}
	defer stmt.Close()
	rows, err := stmt.Query(from_date, to_date, symbol)
	if err != nil {
		fmt.Println("[ERROR] retrieving data from database")
		panic(err)
	}
	defer rows.Close()

	var allData = []*dataEntry{}

	for rows.Next() {
		var id int
		var date string
		var price int
		var symbol string
		// define variables to store the column values

		err := rows.Scan(&id, &date, &price, &symbol)
		if err != nil {
			fmt.Println("[ERROR] retrieving data entry from rows")
			fmt.Println(err)
		}

		// use the retrieved column values as needed
		allData = append(allData, &dataEntry{
			ID:     id,
			Date:   date,
			Price:  price,
			Symbol: symbol,
		})
	}
	return allData
}
