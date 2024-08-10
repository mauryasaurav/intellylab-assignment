package usecase

import (
	"errors"

	"github.com/gin-gonic/gin"
	"github.com/mauryasaurav/intellylab-assignment/server/domain/dto"
	"github.com/mauryasaurav/intellylab-assignment/server/domain/entity"
	"github.com/mauryasaurav/intellylab-assignment/server/domain/interfaces"
	"github.com/mauryasaurav/intellylab-assignment/server/middleware/jwt"
	"golang.org/x/crypto/bcrypt"
)

type userUsecase struct {
	userRepo interfaces.UserRepository
}

func NewUserUsecase(userRepo interfaces.UserRepository) interfaces.UserUsecase {
	return &userUsecase{
		userRepo: userRepo,
	}
}

func (u *userUsecase) CreateUserHandler(ctx *gin.Context, req *dto.UserValidator) (*entity.UserSchema, string, error) {
	user, _ := u.userRepo.FindByEmail(req.Email)
	if user.Email != "" {
		return nil, "", errors.New("user already exist with email")
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", err
	}

	data, err := u.userRepo.CreateUser(entity.UserSchema{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Password:  string(hashedPass),
		Role:      req.Role,
	})

	if err != nil {
		return nil, "", err
	}

	jwtToken := jwt.GenerateJWTToken(data.Id, data.Role, data.Email)
	return data, jwtToken, err
}

func (u *userUsecase) UpdateUserHandler(ctx *gin.Context, req dto.UserUpdateValidator) error {
	return u.userRepo.UpdateByEmail(req.Email, entity.UserSchema{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
	})
}

func (u *userUsecase) DeleteUserHandler(ctx *gin.Context, id string) error {
	return u.userRepo.DeleteUserById(id)
}

func (u *userUsecase) LoginUserHandler(ctx *gin.Context, req dto.UserLoginValidator) (*entity.UserSchema, string, error) {
	user, err := u.userRepo.FindByEmail(req.Email)
	if user.Email == "" {
		return nil, "", errors.New("user not found with given email id")
	}

	valid := u.AuthenticationUser(ctx, req.Password, user.Password)
	if !valid {
		return nil, "", errors.New("password don't match")
	}

	jwtToken := jwt.GenerateJWTToken(user.Id, user.Role, user.Email)
	return user, jwtToken, err
}

func (u *userUsecase) ListUsersHandler(ctx *gin.Context) ([]entity.UserSchema, error) {
	data, err := u.userRepo.GetAllUsers()
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (u *userUsecase) GetUserByEmailHandler(ctx *gin.Context, email string) (*entity.UserSchema, error) {
	data, err := u.userRepo.FindByEmail(email)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (u *userUsecase) AuthenticationUser(ctx *gin.Context, oldPassword string, currentPassword string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(currentPassword), []byte(oldPassword)); err != nil {
		return false
	}

	return true
}
