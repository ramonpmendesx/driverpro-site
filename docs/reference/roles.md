# Roles & Collaboration

MetaGPT's role system defines how agents work together to complete software development tasks.

## Role Definitions

### Product Manager
```python
class ProductManager(Role):
    async def analyze_requirements(self):
        # Requirement analysis logic
        pass

    async def create_user_stories(self):
        # User story creation logic
        pass
```

### Architect
```python
class Architect(Role):
    async def design_system(self):
        # Architecture design logic
        pass

    async def review_design(self):
        # Design review logic
        pass
```

### Project Manager
```python
class ProjectManager(Role):
    async def create_tasks(self):
        # Task creation logic
        pass

    async def track_progress(self):
        # Progress tracking logic
        pass
```

## Collaboration Patterns

### Message Passing
```python
# Example of inter-role communication
await self.send_message(
    receiver=architect,
    message=Message(
        content="Review technical design",
        type="review_request"
    )
)
```

### Workflow Management
```python
class Workflow:
    def __init__(self):
        self.steps = [
            RequirementAnalysis(),
            ArchitectureDesign(),
            Implementation(),
            Testing()
        ]

    async def execute(self):
        for step in self.steps:
            await step.run()
```

## Best Practices

### Role Implementation
1. Clear Responsibilities
2. Focused Actions
3. Efficient Communication
4. Error Handling

### Collaboration Guidelines
1. Structured Messages
2. Defined Workflows
3. Clear Dependencies
4. Progress Tracking