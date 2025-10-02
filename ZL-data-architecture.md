# Data Architecture
```
-- Phase 1: Single database with schema separation
database.zero_down_lease
├── user_schema
├── lease_schema  
├── document_schema
└── payment_schema

-- Phase 2: Database per service (when scale demands)
```
