# Architecture Overview

MetaGPT's architecture is designed to simulate a software company's workflow through multi-agent collaboration.

## System Architecture

```mermaid
graph TD
    A[User Input] --> B[Environment]
    B --> C[Role Manager]
    C --> D[Agents]
    D --> E[Product Manager]
    D --> F[Architect]
    D --> G[Project Manager]
    D --> H[Engineer]
    D --> I[QA]
    E --> J[Output]
    F --> J
    G --> J
    H --> J
    I --> J
```

## Core Components

### Environment
- Manages shared context and resources
- Handles agent communication
- Maintains project state

### Role Manager
- Assigns roles to agents
- Coordinates workflows
- Manages task transitions

### Agents
Each agent has:
- Specific role and responsibilities
- Knowledge base and capabilities
- Communication protocols
- Action patterns

## Communication Flow

1. User input processed by Environment
2. Role Manager assigns tasks
3. Agents collaborate through messages
4. Results consolidated and validated
5. Final output generated