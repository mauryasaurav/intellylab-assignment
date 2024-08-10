package entity

import (
	"time"

	"github.com/google/uuid"
)

/* User Validation*/
type UserSchema struct {
	Id        uuid.UUID `gorm:"primaryKey;type:uuid;default:public.uuid_generate_v4()" json:"id"`
	CreatedAt time.Time `json:"created_at" gorm:"default=now()"`
	UpdatedAt time.Time `json:"updated_at" gorm:"default=now()"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	Role      int64     `json:"role" gorm:"default=1"`
}
