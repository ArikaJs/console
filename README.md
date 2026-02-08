
## Arika Console

`@arikajs/console` provides the command system for the ArikaJS framework.

It allows packages and applications to define, register, and execute CLI commands with arguments, options, and dependency injection — forming the foundation for the `arika` command-line tool.

---

## ✨ Features

- **Command registration & discovery**: Effortlessly manage CLI commands
- **Argument and option parsing**: Structured input handling
- **Signature-based command definitions**: Laravel-style command signatures
- **Dependency injection for commands**: Resolving commands via the service container
- **Input/output helpers**: Simplified interaction with terminal
- **Extensible command lifecycle**: Hooks for pre/post execution
- **TypeScript-first design**: Typed arguments and options

---

## 📦 Installation

```bash
npm install @arikajs/console
# or
yarn add @arikajs/console
# or
pnpm add @arikajs/console
```

---

## 🚀 Defining a Command

```ts
import { Command } from '@arikajs/console';

export class QueueWorkCommand extends Command {
  signature = 'queue:work {--once}';
  description = 'Process queued jobs';

  async handle() {
    // command logic
    this.info('Processing queue...');
    
    if (this.option('once')) {
        this.comment('Running in single-work mode');
    }
  }
}
```

### 🧠 Command Signatures

`command:name {argument} {--option}`

Example:
`make:controller UserController`

---

## 🖥 Running Commands

Commands are executed through the CLI package (`@arikajs/cli`).
This package focuses only on command behavior, not binaries.

---

## 🔗 Integration

- **`@arikajs/queue`** → workers
- **`@arikajs/cache`** → cache commands
- **`@arikajs/events`** → event inspection
- **`@arikajs/logging`** → log tools

---

## 🧠 Architecture (High Level)

```
console/
├── src/
│   ├── Command.ts
│   ├── CommandRegistry.ts
│   ├── Input.ts
│   ├── Output.ts
│   ├── Parser.ts
│   └── index.ts
├── tests/
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

---

## 📄 License

`@arikajs/console` is open-source software licensed under the **MIT License**.

---

## 🧭 Philosophy

> "Powerful tools start with simple commands."
