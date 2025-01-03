// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
//# #if HAVE_VSCODE
import * as vscode from 'vscode';
import {LanguageClient} from "vscode-languageclient/node";
//# #elif HAVE_COC_NVIM
import * as vscode from 'coc.nvim';
import {LanguageClient} from "coc.nvim";
//# #endif

let client: LanguageClient;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.info(`hyuga-vscode-client activation...`);

  try {
    const serverOptions = {
      command: "hyuga",
    };
    const clientOptions = {
      documentSelector: [
        {
          scheme: "file",
          language: "hy",
        }
      ],
    };
    client = new LanguageClient("hyuga", serverOptions, clientOptions);
    client.start();
  } catch (e) {
    vscode.window.showErrorMessage(`hyuga couldn't be started.\nerror=${e}`);
  }
}

// This method is called when your extension is deactivated
function deactivate() {
  if (client) {return client.stop();}
}

module.exports = { activate, deactivate };
