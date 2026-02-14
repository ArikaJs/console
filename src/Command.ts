
import { Input } from './Input';
import { Output } from './Output';

export abstract class Command {
    public abstract signature: string;
    public abstract description: string;

    protected input!: Input;
    protected output!: Output;
    protected registry!: any;

    public setInput(input: Input) {
        this.input = input;
    }

    public setOutput(output: Output) {
        this.output = output;
    }

    public setRegistry(registry: any) {
        this.registry = registry;
    }

    public abstract handle(): Promise<any> | any;

    /**
     * Optional initialization hook that runs before handle().
     */
    public initialize(): Promise<void> | void {
        // can be overridden
    }

    protected argument(key: string, defaultValue: any = null): any {
        return this.input.argument(key, defaultValue);
    }

    protected option(key: string, defaultValue: any = null): any {
        return this.input.option(key, defaultValue);
    }

    protected info(message: string) {
        this.output.info(message);
    }

    protected error(message: string) {
        this.output.error(message);
    }

    protected warning(message: string) {
        this.output.warning(message);
    }

    protected comment(message: string) {
        this.output.comment(message);
    }

    protected write(message: string) {
        this.output.write(message);
    }

    protected writeln(message: string) {
        this.output.writeln(message);
    }
}
