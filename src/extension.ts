// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import Player from "./utils/Player";

let myStatusBarItem: vscode.StatusBarItem;
const START_COMMAND = "hellomomo.start";
const CHANG_LANGUAGE_COMMAND = "hellomomo.changelanguage";
const PREV_WORD_COMMAND = "hellomomo.prevSentence";
const NEXT_WORD_COMMAND = "hellomomo.nextSentence";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const player = new Player(context);
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const SentenceBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -103
  );
  const prevBtn = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -104
  );
  const nextBtn = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -105
  );
  prevBtn.text = "<";
  prevBtn.tooltip = "Previous Sentence";
  prevBtn.command = PREV_WORD_COMMAND;
  nextBtn.text = ">";
  nextBtn.tooltip = "Next Sentence";
  nextBtn.command = NEXT_WORD_COMMAND;
  SentenceBar.command = CHANG_LANGUAGE_COMMAND;

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    ...[
      vscode.commands.registerCommand(START_COMMAND, () => {
        player.isStart = !player.isStart;
        if (player.isStart) {
          initializeBar();
          prevBtn.show();
          nextBtn.show();
          SentenceBar.show();
        } else {
          prevBtn.hide();
          nextBtn.hide();
          SentenceBar.hide();
        }
        // The code you place here will be executed every time your command is executed
        vscode.window.showInformationMessage(`Hello Momo, Keep going!`);
      }),
      vscode.commands.registerCommand(PREV_WORD_COMMAND, () => {
        player.prevWord();
        initializeBar();
      }),
      vscode.commands.registerCommand(NEXT_WORD_COMMAND, () => {
        player.nextWord();
        initializeBar();
      }),
      vscode.commands.registerCommand(CHANG_LANGUAGE_COMMAND, () => {
        player.changelanguage();
        initializeBar();
      }),
    ]
  );

  function setUpSentenceBar() {
    SentenceBar.text = player.getInitialWordBarContent();
  }

  function initializeBar() {
    setUpSentenceBar();
  }

  // register some listener that make sure the status bar
  // item always up-to-date

  // update status bar item once at start
}

// This method is called when your extension is deactivated
export function deactivate() {}
