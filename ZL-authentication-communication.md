# Authentication & Communication

- Centralized Auth Flow:
```

Client → API Gateway → [JWT Validation] → Microservice → Response
```
- Service-to-Service Communication:
```

# Synchronous (HTTP/REST)
- Service discovery via Gateway
- Request/response for immediate actions

# Asynchronous (Message Queue - Future)
- Event-driven for non-critical operations
- Email notifications, analytics, reporting

```
