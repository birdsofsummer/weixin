package db

import "encoding/json"

func UnmarshalToken(data []byte) (Token, error) {
	var r Token
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *Token) Marshal() ([]byte, error) {
	return json.Marshal(r)
}


type Token struct {
	AccessToken string `json:"access_token"`
	ExpiresIn   int64  `json:"expires_in"`  
}
