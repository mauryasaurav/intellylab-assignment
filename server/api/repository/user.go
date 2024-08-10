package repository

import (
	"context"
	"fmt"

	"github.com/mauryasaurav/intellylab-assignment/server/domain/entity"
	"github.com/mauryasaurav/intellylab-assignment/server/domain/interfaces"
	"gorm.io/gorm"
)

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) interfaces.UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) CreateUser(user entity.UserSchema) (*entity.UserSchema, error) {
	result := r.db.WithContext(context.Background()).Create(&user)
	fmt.Println(result.Error)
	return &user, result.Error
}

func (r *userRepository) FindByEmail(email string) (*entity.UserSchema, error) {
	var user entity.UserSchema
	result := r.db.WithContext(context.Background()).Model(&entity.UserSchema{}).Where("email = ?", email).Find(&user).Limit(1)
	return &user, result.Error
}

func (r *userRepository) UpdateByEmail(email string, user entity.UserSchema) error {
	result := r.db.WithContext(context.Background()).Where("email = ?", email).Updates(user)
	result.Scan(&user)
	return result.Error
}

func (r *userRepository) GetAllUsers() ([]entity.UserSchema, error) {
	var users []entity.UserSchema
	result := r.db.WithContext(context.Background()).Find(&users)
	return users, result.Error
}

func (r *userRepository) DeleteUserById(id string) error {
	result := r.db.Where("id = ?", id).Delete(&entity.UserSchema{})
	return result.Error
}
