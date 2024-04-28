// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

let myStatusBarItem: vscode.StatusBarItem;

function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
	let lines = 0;
	if (editor) {
		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
	}
	return lines;
}

function updateStatusBarItem(): void {
	const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
	if (n > 0) {
		myStatusBarItem.text = `Hello Momo $(megaphone) ${n} line(s) selected`;
		myStatusBarItem.show();
	} else {
		myStatusBarItem.hide();
	}
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate({subscriptions}: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "hellomomo" is now active!');
  const myCommandId = 'hellomomo.start' 
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json 
  subscriptions.push(
    vscode.commands.registerCommand(
    myCommandId,
    () => {
      // The code you place here will be executed every time your command is executed 
      const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
      vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);
    }
  ));

  myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10000);
	myStatusBarItem.command = myCommandId;
	subscriptions.push(myStatusBarItem);

  // register some listener that make sure the status bar 
	// item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

  // update status bar item once at start
	updateStatusBarItem();
}

// This method is called when your extension is deactivated
export function deactivate() {}
