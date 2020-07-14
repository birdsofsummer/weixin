// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse and unparse this JSON data, add this code to your project and do:
//
//    topLevel, err := UnmarshalTopLevel(bytes)
//    bytes, err = topLevel.Marshal()

package jssdk

import "encoding/json"

func UnmarshalTopLevel(data []byte) (TopLevel, error) {
	var r TopLevel
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *TopLevel) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type TopLevel struct {
	AppID       string `json:"appId"`       
	NonceStr    string `json:"nonceStr"`    
	JsapiTicket string `json:"jsapi_ticket"`
	Signature   string `json:"signature"`   
	URL         string `json:"url"`         
	RawString   string `json:"rawString"`   
	Timestamp   int64  `json:"timestamp"`   
	ExpiresIn   int64  `json:"expires_in"`  
	Token       string `json:"token"`       
}

type Raw struct {
	Token       string `json:"token"`       
	AppID       string `json:"appId"`       
	NonceStr    string `json:"nonceStr"`    
	JsapiTicket string `json:"jsapi_ticket"`
//	Signature   string `json:"signature"`   
	URL         string `json:"url"`         
//	RawString   string `json:"rawString"`   
	Timestamp   int64  `json:"timestamp"`   
	ExpiresIn   int64  `json:"expires_in"`  
}


