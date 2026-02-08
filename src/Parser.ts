
export interface ParsedSignature {
    name: string;
    arguments: { name: string; required: boolean }[];
    options: { name: string; hasValue: boolean }[];
}

export class Parser {
    public static parseSignature(signature: string): ParsedSignature {
        const parts = signature.split(/\s+/);
        const name = parts[0];
        const args: { name: string; required: boolean }[] = [];
        const options: { name: string; hasValue: boolean }[] = [];

        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];

            // Match {argument} or {argument?}
            const argMatch = part.match(/^\{([^}]+)\}$/);
            if (argMatch) {
                const argName = argMatch[1];
                if (argName.startsWith('--')) {
                    const optName = argName.substring(2);
                    options.push({ name: optName, hasValue: optName.includes('=') });
                } else {
                    args.push({
                        name: argName.endsWith('?') ? argName.slice(0, -1) : argName,
                        required: !argName.endsWith('?')
                    });
                }
            }
        }

        return { name, arguments: args, options };
    }

    public static parseArguments(rawArgs: string[], signature: ParsedSignature) {
        const argsMap = new Map<string, any>();
        const optionsMap = new Map<string, any>();

        let argIndex = 0;
        for (let i = 0; i < rawArgs.length; i++) {
            const raw = rawArgs[i];

            if (raw.startsWith('--')) {
                const [optName, optValue] = raw.substring(2).split('=');
                if (optValue !== undefined) {
                    optionsMap.set(optName, optValue);
                } else {
                    optionsMap.set(optName, true);
                }
            } else if (argIndex < signature.arguments.length) {
                argsMap.set(signature.arguments[argIndex].name, raw);
                argIndex++;
            }
        }

        return { arguments: argsMap, options: optionsMap };
    }
}
