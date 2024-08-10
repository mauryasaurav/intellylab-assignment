package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	handler "github.com/mauryasaurav/intellylab-assignment/server/api/http"
	"github.com/mauryasaurav/intellylab-assignment/server/api/repository"
	"github.com/mauryasaurav/intellylab-assignment/server/api/usecase"
	"github.com/mauryasaurav/intellylab-assignment/server/db"
	"github.com/mauryasaurav/intellylab-assignment/server/middleware/auth"
	"github.com/pelletier/go-toml"
)

func main() {
	config, err := toml.LoadFile("config.toml")
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] loading toml file: %+v\n", err)
		return
	}

	dbConn, err := db.SetupAndConnectDB(config)
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	route := gin.Default()

	store := cookie.NewStore([]byte("secret"))
	route.Use(sessions.Sessions("intellylabsession", store))

	route.Use(auth.JSONMiddleware())

	// CORS Configuration
	route.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},                   // Allow this origin
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},            // Allow these methods
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"}, // Allow these headers
	}))

	api := route.Group("/api/")

	// user
	userRoute := api.Group("/user")
	userRepo := repository.NewUserRepository(dbConn)
	userUsecase := usecase.NewUserUsecase(userRepo)
	handler.NewUserHandler(userRoute, userUsecase)

	port := os.Getenv("PORT")
	if port == "" {
		port = config.Get("env.port").(string)
	}

	route.Run(":" + port)
}
