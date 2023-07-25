/**
 * Represents the arguments and options of the program.
 */
export interface Arguments {
    /** Website name. */
    website: string;
    /** Keywords to search for. */
    keywords: string[];
    /** Maximum page to search for. */
    maxPage: number;
}
/**
 * Represents the arguments and options parser of the program.
 */
export declare class ArgumentsParser {
    #private;
    /**
     * Constructs a new instance of the arguments and options parser of the program.
     */
    constructor();
    /**
     * Parses the arguments and options of the program.
     * @param argv - An optional array of strings representing the command-line arguments.
     * @returns A promise that resolves to the arguments and options.
     */
    parse(argv?: readonly string[]): Promise<Arguments>;
}
