# Quick Start Guide

Get started with MetaGPT in minutes. This guide will help you set up and run your first MetaGPT project.

## Installation

```bash
pip install metagpt
```

## Basic Usage

1. Set up your OpenAI API key:

```bash
export OPENAI_API_KEY="your-api-key"
```

2. Create a new project:

```python
from metagpt.software_company import SoftwareCompany
from metagpt.roles import ProjectManager, Architect, Engineer

# Initialize the company
company = SoftwareCompany()

# Add your requirement
company.start_project("Create a simple web calculator")
```

## Example Output

MetaGPT will generate:
- Project requirements analysis
- System architecture design
- Task breakdown
- Implementation code
- Test cases
- Documentation

## Next Steps

- Learn about [Multi-Agent System](/reference/multi-agent)
- Explore [Custom Roles](/examples/custom-roles)
- Check out [Code Generation Examples](/examples/code-generation)