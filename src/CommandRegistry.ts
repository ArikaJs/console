
import { Command } from './Command';
import { Parser } from './Parser';
import { Input } from './Input';
import { Output } from './Output';

export class CommandRegistry {
    protected commands: Map<string, typeof Command> = new Map();
    protected resolver: (commandClass: any) => Command;

    constructor(resolver?: (commandClass: any) => Command) {
        this.resolver = resolver || ((cls) => new cls());
    }

    public register(command: any) {
        const instance = this.resolver(command);
        const { name } = Parser.parseSignature(instance.signature);
        this.commands.set(name, command);
    }

    public async run(rawArgs: string[]) {
        const commandName = rawArgs[0];
        const commandClass = this.commands.get(commandName);

        if (!commandClass) {
            throw new Error(`Command "${commandName}" not found.`);
        }

        const command = this.resolver(commandClass);
        const signature = Parser.parseSignature(command.signature);
        const { arguments: args, options } = Parser.parseArguments(rawArgs.slice(1), signature);

        const input = new Input(args, options);
        const output = new Output();

        command.setInput(input);
        command.setOutput(output);

        await command.initialize();

        return await command.handle();
    }

    public all() {
        return this.commands;
    }
}
