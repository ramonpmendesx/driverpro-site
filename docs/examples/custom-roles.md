# Custom Roles Examples

Learn how to create and customize roles in MetaGPT.

## Basic Role Creation

```python
from metagpt.roles import Role

class SecurityEngineer(Role):
    def __init__(self):
        super().__init__()
        self.name = "SecurityEngineer"
        self.profile = "Expert in application security"
        
    async def security_audit(self, code):
        # Security audit implementation
        pass
        
    async def run(self):
        # Main execution logic
        pass
```

## Role with Custom Actions

```python
from metagpt.actions import Action
from metagpt.roles import Role

class CodeReview(Action):
    async def run(self, code):
        # Code review logic
        pass

class SeniorEngineer(Role):
    def __init__(self):
        super().__init__()
        self.actions = [CodeReview()]
```

## Specialized Development Roles

### Frontend Engineer
```python
class FrontendEngineer(Role):
    async def create_ui_components(self):
        # UI component creation
        pass
        
    async def optimize_performance(self):
        # Frontend optimization
        pass
```

### Database Engineer
```python
class DatabaseEngineer(Role):
    async def design_schema(self):
        # Schema design logic
        pass
        
    async def optimize_queries(self):
        # Query optimization
        pass
```

## Role Integration

### Team Assembly
```python
from metagpt.software_company import SoftwareCompany

company = SoftwareCompany()
company.hire([
    FrontendEngineer(),
    DatabaseEngineer(),
    SecurityEngineer()
])
```

### Workflow Integration
```python
class CustomWorkflow:
    def __init__(self, roles):
        self.roles = roles
        
    async def execute(self):
        for role in self.roles:
            await role.run()
```

## Best Practices

### Role Design
1. Single Responsibility
2. Clear Interface
3. Error Handling
4. Documentation

### Communication
1. Structured Messages
2. Clear Protocols
3. Error Recovery
4. Status Updates