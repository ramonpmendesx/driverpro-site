# Basic Usage Examples

Learn how to use MetaGPT through practical examples.

## Simple Project Creation

```python
from metagpt.software_company import SoftwareCompany

# Initialize company
company = SoftwareCompany()

# Start a project
company.start_project(
    "Create a REST API for a todo list application"
)
```

## Custom Configuration

```python
from metagpt.config import Config

config = Config(
    openai_api_key="your-key",
    model="gpt-4",
    temperature=0.7
)

company = SoftwareCompany(config=config)
```

## Role Customization

```python
from metagpt.roles import Engineer

class FullStackEngineer(Engineer):
    async def implement_feature(self, task):
        # Implementation logic
        pass

company.hire([FullStackEngineer()])
```

## Project Output

The generated output includes:

```
project/
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   └── api_spec.md
├── src/
│   ├── main.py
│   ├── models.py
│   └── routes.py
└── tests/
    ├── test_models.py
    └── test_routes.py
```

## Error Handling

```python
try:
    await company.start_project("Project requirements")
except Exception as e:
    print(f"Error: {e}")
    # Handle error appropriately
```

## Advanced Usage

### Custom Workflows
```python
from metagpt.workflow import Workflow

class CustomWorkflow(Workflow):
    async def execute(self):
        # Custom workflow logic
        pass

company.set_workflow(CustomWorkflow())
```

### Project Monitoring
```python
# Get project status
status = company.get_project_status()
print(f"Current phase: {status.phase}")
print(f"Progress: {status.progress}%")
```