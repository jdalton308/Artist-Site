const REQUIRED_BLANK_LINES = 2;

function isImportStatement(node) {
  return node.type === "ImportDeclaration";
}


function isFunctionStatement(node) {
  if (node.type === "FunctionDeclaration") {
    return true;
  }

  if (node.type === "ExportNamedDeclaration" && node.declaration?.type === "FunctionDeclaration") {
    return true;
  }

  if (node.type === "ExportDefaultDeclaration" && node.declaration?.type === "FunctionDeclaration") {
    return true;
  }

  return false;
}


function blankLinesBetween(endLine, startLine) {
  return startLine - endLine - 1;
}


/** @type {import('eslint').Rule.RuleModule} */
const doubleBlankLinesRule = {
  meta: {
    type: "layout",
    docs: {
      description:
        "Require two blank lines after import groups and between top-level function declarations",
    },
    schema: [],
    messages: {
      afterImports:
        "Expected {{required}} blank lines after the import group, but found {{found}}.",
      betweenFunctions:
        "Expected {{required}} blank lines between functions, but found {{found}}.",
    },
  },
  create(context) {
    return {
      Program(programNode) {
        const statements = programNode.body;

        if (!statements.length) {
          return;
        }

        let lastImportIndex = -1;

        for (let index = 0; index < statements.length; index += 1) {
          if (isImportStatement(statements[index])) {
            lastImportIndex = index;
          }
        }

        if (lastImportIndex >= 0 && lastImportIndex < statements.length - 1) {
          const lastImport = statements[lastImportIndex];
          const nextStatement = statements[lastImportIndex + 1];
          const found = blankLinesBetween(lastImport.loc.end.line, nextStatement.loc.start.line);

          if (found !== REQUIRED_BLANK_LINES) {
            context.report({
              node: nextStatement,
              messageId: "afterImports",
              data: {
                required: REQUIRED_BLANK_LINES,
                found,
              },
            });
          }
        }

        const functionIndices = [];

        for (let index = 0; index < statements.length; index += 1) {
          if (isFunctionStatement(statements[index])) {
            functionIndices.push(index);
          }
        }

        for (let index = 1; index < functionIndices.length; index += 1) {
          const previousFunction = statements[functionIndices[index - 1]];
          const currentFunction = statements[functionIndices[index]];
          const found = blankLinesBetween(
            previousFunction.loc.end.line,
            currentFunction.loc.start.line,
          );

          if (found !== REQUIRED_BLANK_LINES) {
            context.report({
              node: currentFunction,
              messageId: "betweenFunctions",
              data: {
                required: REQUIRED_BLANK_LINES,
                found,
              },
            });
          }
        }
      },
    };
  },
};

export default doubleBlankLinesRule;
