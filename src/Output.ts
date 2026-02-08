
export class Output {
    public write(message: string) {
        process.stdout.write(message);
    }

    public writeln(message: string) {
        process.stdout.write(message + '\n');
    }

    public info(message: string) {
        this.writeln(`\x1b[32m${message}\x1b[0m`); // Green
    }

    public error(message: string) {
        process.stderr.write(`\x1b[31m${message}\x1b[0m\n`); // Red
    }

    public warning(message: string) {
        this.writeln(`\x1b[33m${message}\x1b[0m`); // Yellow
    }

    public comment(message: string) {
        this.writeln(`\x1b[34m${message}\x1b[0m`); // Blue
    }
}
