package utility

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func InitializeMySQL() {
	dBConnection, err := sql.Open("mysql", "root:dbroot@(localhost:3306)/true_beacon")
	if err != nil {
		fmt.Println("Connection Failed!!")
	}
	// defer dBConnection.Close()
	err = dBConnection.Ping()
	if err != nil {
		fmt.Println("Ping Failed!!")
	}
	db = dBConnection
	// dBConnection.SetMaxOpenConns(10)
	// dBConnection.SetMaxIdleConns(5)
	// dBConnection.SetConnMaxLifetime(time.Second * 10)
}

func GetMySQLConnection() *sql.DB {
	return db
}
