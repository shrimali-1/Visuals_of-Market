package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	gohandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	terminal_logger := log.New(os.Stdout, "product-api", log.LstdFlags)
	file, err := os.OpenFile("logfile.txt", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)

	if err != nil {
		ERROR := fmt.Errorf("[ERROR] while opening the log file")
		terminal_logger.Println(ERROR)
	}
	defer file.Close()
	logger := log.New(file, "LOG: ", log.Ldate|log.Ltime|log.Lshortfile)
	//

	historialDataHandler := handlers.NewHistorialData(logger)

	serveMux := mux.NewRouter()

	getRouter := serveMux.Methods(http.MethodGet).Subrouter()
	getRouter.HandleFunc("/historical_data", historialDataHandler.GetHistorialData)

	// CORS
	ch := gohandlers.CORS(gohandlers.AllowedOrigins([]string{"http://localhost:3000"}))

	s := http.Server{
		Addr:         ":9090",
		Handler:      ch(serveMux),
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  1 * time.Second,
		WriteTimeout: 1 * time.Second,
	}

	// Listen for connections on all ip addresses (0.0.0.0)
	// port 9090
	log.Println("Starting Server")
	go func() {
		err := s.ListenAndServe()
		if err != nil {
			terminal_logger.Fatal(err)
		}
	}()

	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, os.Kill)

	sig := <-sigChan
	terminal_logger.Println("Received terminate, graceful shutdown", sig)

	tc, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.Shutdown(tc)
}
