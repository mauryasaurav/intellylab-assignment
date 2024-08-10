package helpers

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetUserDeatil(c *gin.Context) (string, uuid.UUID) {
	session := sessions.Default(c)
	email := session.Get("email")
	userId := session.Get("user_id")
	return email.(string), uuid.MustParse(userId.(string))
}
