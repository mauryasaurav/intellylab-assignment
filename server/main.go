package main

import (
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	handler "github.com/mauryasaurav/intellylab-assignment/server/api/http"
	"github.com/mauryasaurav/intellylab-assignment/server/api/repository"
	"github.com/mauryasaurav/intellylab-assignment/server/api/usecase"
	"github.com/mauryasaurav/intellylab-assignment/server/domain/entity"
	"github.com/mauryasaurav/intellylab-assignment/server/middleware/auth"
	"github.com/mauryasaurav/intellylab-assignment/server/utils/constants"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dbConn, err := gorm.Open(postgres.Open(constants.DB_URL), &gorm.Config{})
	if err != nil {
		fmt.Println(err.Error())
		panic("dbConn not connected")
	}

	dbConn.AutoMigrate(&entity.UserSchema{})

	route := gin.Default()

	route.Use(auth.JSONMiddleware())

	// CORS Configuration
	route.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},                   // Allow this origin
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},            // Allow these methods
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"}, // Allow these headers
	}))


	store := cookie.NewStore([]byte("secret"))
	route.Use(sessions.Sessions("mysession", store))

	api := route.Group("/api/")

	// user
	userRoute := api.Group("/user")
	userRepo := repository.NewUserRepository(dbConn)
	userUsecase := usecase.NewUserUsecase(userRepo)
	handler.NewUserHandler(userRoute, userUsecase)

	// private
	private := api.Group("/private")
	private.Use(auth.AuthRequired)
	{
		// Category
		// categoryRepo := repository.NewCategoryRepository(dbConn)
		// categoryUsecase := usecase.NewCategoryUsecase(categoryRepo)
		// handler.NewCategoryHandler(private, categoryUsecase)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "5001"
	}

	route.Run(":" + port)
}
