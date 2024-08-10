package interfaces

import (
	"github.com/gin-gonic/gin"
	"github.com/mauryasaurav/intellylab-assignment/server/domain/dto"
	"github.com/mauryasaurav/intellylab-assignment/server/domain/entity"
)

type UserUsecase interface {
	AuthenticationUser(ctx *gin.Context, oldPassword string, currentPassword string) bool
	CreateUserHandler(ctx *gin.Context, request *dto.UserValidator) (*entity.UserSchema, string, error)
	LoginUserHandler(ctx *gin.Context, request dto.UserLoginValidator) (*entity.UserSchema, string, error)
	UpdateUserHandler(ctx *gin.Context, request dto.UserUpdateValidator) error
	DeleteUserHandler(ctx *gin.Context, id string) error
	ListUsersHandler(ctx *gin.Context) ([]entity.UserSchema, error)
	GetUserByEmailHandler(ctx *gin.Context, email string) (*entity.UserSchema, error)
}

type UserRepository interface {
	FindByEmail(email string) (*entity.UserSchema, error)
	DeleteUserById(id string) error
	GetAllUsers() ([]entity.UserSchema, error)
	CreateUser(user entity.UserSchema) (*entity.UserSchema, error)
	UpdateByEmail(email string, user entity.UserSchema) error
}
