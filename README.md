# Sematic-analyser
The objective of the assignment is to create the symbol table and write the semantic analysis for the Alf language.

You will receive as input a file that contains an AST that correctly parses a source language. What you need to do is generate:

the table of symbols
a new AST with the following modifications
the new AST is a list of statements
all AST nodes have a new property called symbol, which refers to the symbol array entry where they declare variables, functions and types
the main program is called “Statements”
a list of errors
