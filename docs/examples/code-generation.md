# Code Generation Examples

Learn how MetaGPT generates production-ready code through examples.

## Web Application

### Input Requirement
```python
company.start_project("""
Create a Flask web application with:
- User authentication
- RESTful API
- SQLite database
""")
```

### Generated Structure
```
webapp/
├── app/
│   ├── __init__.py
│   ├── models.py
│   ├── routes.py
│   └── auth.py
├── tests/
│   └── test_app.py
└── config.py
```

### Sample Output
```python
# app/models.py
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password_hash = db.Column(db.String(120))
```

## API Service

### Input Requirement
```python
company.start_project("""
Create a FastAPI service for:
- Product inventory management
- CRUD operations
- JWT authentication
""")
```

### Generated Structure
```
api_service/
├── app/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── auth.py
└── tests/
    └── test_api.py
```

### Sample Output
```python
# app/main.py
from fastapi import FastAPI, Depends
from .auth import get_current_user

app = FastAPI()

@app.get("/products")
async def get_products(user = Depends(get_current_user)):
    return {"products": []}
```

## Best Practices

### Code Quality
- PEP 8 compliance
- Type hints
- Docstrings
- Error handling

### Testing
- Unit tests
- Integration tests
- Test coverage

### Documentation
- API documentation
- Setup instructions
- Usage examples