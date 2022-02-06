The program receive as input a file that contains an AST that correctly parses a source language. It generates:

the table of symbols
a new AST with the following changes
the new AST is a list of statements
all AST nodes have a new property called symbol, which refers to the symbol array entry where they declare variables, functions and types
the main program is called “Statements”
a list of errors


The program will receive two parameters from the command line:

source file
the output file

The output file format is as follows

{
     symbol_table: [...], // the symbol table
     
     ast: [...], // the new AST
     
     error_list: [] // the list of errors
}



