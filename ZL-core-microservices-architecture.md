# Core Microservices Architecture

**1. API GATEWAY**

- Purpose: Single entry point, auth, rate limiting
```

# Key Requirements:
- JWT token validation
- Request routing & load balancing
- Rate limiting per service
- Request/response logging
```
**2. USER SERVICE**

- Stakeholder Needs:

    - Sales: Customer management, lead tracking

    - Legal: Consent management, GDPR compliance

    - Product: User profiles, preferences
```
# Endpoints:
POST /auth/login          # JWT-based auth
POST /auth/register       # User registration  
GET  /users/{id}          # Profile management
PUT  /users/{id}/consent  # Legal compliance
```
