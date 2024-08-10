package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq" // Import PostgreSQL driver for database/sql
	"github.com/mauryasaurav/intellylab-assignment/server/domain/entity"
	"github.com/pelletier/go-toml"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func SetupAndConnectDB(config *toml.Tree) (*gorm.DB, error) {
	// Extract values from the configuration
	host := config.Get("postgres.host").(string)
	port := config.Get("postgres.port").(int64)
	user := config.Get("postgres.user").(string)
	password := config.Get("postgres.password").(string)
	dbName := config.Get("postgres.dbname").(string)
	sslMode := config.Get("postgres.sslmode").(string)

	// Step 1: Connect to the default PostgreSQL database to create the target database
	defaultConnStr := fmt.Sprintf("user=%s password=%s host=%s port=%d sslmode=%s",
		user, password, host, port, sslMode)

	// Connect to the default database
	dbv, err := sql.Open("postgres", defaultConnStr)
	if err != nil {
		log.Fatalf("Failed to connect to the default database: %v", err)
	}
	defer dbv.Close()

	// Create the target database if it doesn't exist
	_, err = dbv.Exec(fmt.Sprintf("CREATE DATABASE %s", dbName))
	if err != nil && err.Error() != fmt.Sprintf(`pq: database "%s" already exists`, dbName) {
		return nil, fmt.Errorf("error creating database: %v", err)
	}

	fmt.Println("Database created successfully or already exists.")

	// Connect to the newly created or existing database using GORM
	dbUrl := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		host, port, user, password, dbName, sslMode)

	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to the target database: %v", err)
	}

	err = db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"").Error
	if err != nil {
		fmt.Println("Error creating extension:", err)
	}

	// migrate users tables
	err = db.AutoMigrate(&entity.UserSchema{})
	if err != nil {
		fmt.Println("Error during migration:", err)
	}

	return db, nil
}
