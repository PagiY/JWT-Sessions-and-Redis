## ABOUT

### Exploring JWT and Sessions + Redis for user auth

#### JSON Web Tokens (JWT)

* Stateless approach. No database required but client-side must save the token (via cookie or localStorage - not recommended).
* Good for server-server communications or microservices architecture.
* Uses the concept of refresh tokens, where an expired access token is secretly refreshed and given a new token without logging out the user.
* Refresh tokens can be stored in a database and must be encrypted (but it loses its statelessness)

#### Sessions

* Stateful approach. Authentication data should be stored in both the client and server side.
* Sessions can easily be invalidated.
* Sessions are generally recommended than JWT. 

## READINGS

* [An Introduction to Identity and Access Management](https://curity.io/resources/learn/introduction-identity-and-access-management/)
* [Difference between Session Cookies vs. JWT (JSON Web Tokens), for session management.](https://medium.com/@prashantramnyc/difference-between-session-cookies-vs-jwt-json-web-tokens-for-session-management-4be67d2f066e)
* [Why you should not use JWT](https://apibakery.com/blog/tech/no-jwt/)
* [API Authentication techniques](https://docs.google.com/spreadsheets/d/1tAX5ZJzluilhoYKjra-uHbMCZraaQkqIHl3RIQ8mVkM/edit?pli=1#gid=0)
* [JSON Web Tokens (JWT) — the only explanation you will ever need](https://arielweinberger.medium.com/json-web-token-jwt-the-only-explanation-youll-ever-need-cf53f0822f50)
* [Authentication on the Web](https://github.com/alex996/presentations/blob/master/auth.md)
