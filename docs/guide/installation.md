# Installation Guide

This guide will help you set up MetaGPT in your development environment.

## Prerequisites

- Python 3.9 or higher
- pip (Python package installer)
- OpenAI API key

## Step-by-Step Installation

### 1. Install via pip

```bash
pip install metagpt
```

### 2. Configure Environment Variables

Create a `.env` file in your project root:

```bash
OPENAI_API_KEY=your-api-key
OPENAI_API_MODEL=gpt-4  # or gpt-3.5-turbo
```

Or set them in your shell:

```bash
export OPENAI_API_KEY="your-api-key"
export OPENAI_API_MODEL="gpt-4"
```

### 3. Verify Installation

```python
import metagpt
print(metagpt.__version__)
```

## Configuration Options

### API Settings
- `OPENAI_API_BASE`: Custom API endpoint (optional)
- `OPENAI_API_MODEL`: GPT model selection
- `MAX_TOKENS`: Maximum tokens per request
- `TEMPERATURE`: Response randomness (0.0-1.0)

### Proxy Settings (if needed)
```bash
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"
```

## Troubleshooting

### Common Issues

1. API Key Issues
```bash
Error: OpenAI API key not found
Solution: Ensure OPENAI_API_KEY is properly set
```

2. Dependencies
```bash
Error: Module not found
Solution: Run pip install --upgrade metagpt
```

For more help, visit our [GitHub Issues](https://github.com/geekan/MetaGPT/issues) page.