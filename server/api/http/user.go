package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mauryasaurav/intellylab-assignment/server/domain/dto"
	"github.com/mauryasaurav/intellylab-assignment/server/domain/interfaces"
	"github.com/mauryasaurav/intellylab-assignment/server/middleware/auth"
	"github.com/mauryasaurav/intellylab-assignment/server/utils/helpers"
)

type userHandler struct {
	userUsecase interfaces.UserUsecase
}

func NewUserHandler(route *gin.RouterGroup, u interfaces.UserUsecase) {
	handler := userHandler{userUsecase: u}
	route.POST("/create", handler.CreateUser)
	route.POST("/login", handler.LoginUser)
	route.PUT("/update", auth.AuthRequired, handler.UpdateUser)
	route.GET("/list", auth.AuthRequired, handler.ListUsers)
	route.GET("/check_auth", auth.AuthRequired, handler.CheckUserAuthentication)
	route.DELETE("/update/:id", auth.AuthRequired, handler.DeleteUser)
}

func (h *userHandler) LoginUser(ctx *gin.Context) {
	req := new(dto.UserLoginValidator)
	if err := ctx.Bind(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, jwtToken, err := h.userUsecase.LoginUserHandler(ctx, *req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "user login successfully", "data": user, "token": jwtToken})
}

func (h *userHandler) CreateUser(ctx *gin.Context) {
	created := new(dto.UserValidator)
	if err := ctx.Bind(created); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, jwtToken, err := h.userUsecase.CreateUserHandler(ctx, created)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "User created successfully", "data": user, "token": jwtToken})
}

func (h *userHandler) UpdateUser(ctx *gin.Context) {
	updated := new(dto.UserUpdateValidator)
	if err := ctx.Bind(&updated); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.userUsecase.UpdateUserHandler(ctx, *updated)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
}

func (h *userHandler) DeleteUser(ctx *gin.Context) {
	id := ctx.Param("id")

	err := h.userUsecase.DeleteUserHandler(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User Deleted successfully"})
}

func (h *userHandler) ListUsers(ctx *gin.Context) {
	users, err := h.userUsecase.ListUsersHandler(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Update user successfully", "users": users})
}

func (h *userHandler) CheckUserAuthentication(ctx *gin.Context) {
	email, _ := helpers.GetUserDeatil(ctx)
	user, err := h.userUsecase.GetUserByEmailHandler(ctx, email)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Authenticated", "data": user})
}
