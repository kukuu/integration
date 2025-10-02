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
**3. LEASE SERVICE (Core Domain)**

- Stakeholder Needs:

        - Sales: Lease extension pipeline management

        - Legal: Contract templates, compliance rules

        - Product: Lease calculation engine
```

# Endpoints:
POST /leases/calculate    # Extension calculations
GET  /leases/{id}         # Case management
POST /leases/{id}/submit  # Legal submission

```
**4. DOCUMENT AI SERVICE**

- Stakeholder Needs:

        - Legal: Automated document analysis

        - Sales: Quick contract generation

        - Product: AI-powered insights
```
  # Endpoints:
POST /documents/analyze   # AI lease analysis
POST /documents/generate  # Contract generation
GET  /documents/templates # Legal templates
```
**5. PAYMENT SERVICE**

- Stakeholder Needs:

        - Sales: Payment tracking, commission calc

        - Legal: Audit trails, compliance

  ```

  # Endpoints:
POST /payments/create     # Payment initiation
GET  /payments/{id}       # Status tracking
POST /webhooks/stripe     # External integrations

```
