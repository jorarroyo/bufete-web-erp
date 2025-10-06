package com.bufete.backend.payload.security;

public class AccessTokenRequest {

    // @JsonProperty("access_Token")
    private String token;

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String token) {
        this.token = token;
    }

    public AccessTokenRequest(String token) {
        this.token = token;
    }

    public AccessTokenRequest() {
    }
}