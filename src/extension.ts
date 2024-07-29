// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import Player from "./utils/Player";

let myStatusBarItem: vscode.StatusBarItem;
const START_COMMAND = "hellomomo.start";
const PLAY_COMMAND = "hellomomo.play";
const CHANG_LANGUAGE_COMMAND = "hellomomo.changelanguage";
const CHANG_LANGUAGE_COMMAND2 = "hellomomo.changelanguage2";
const PREV_WORD_COMMAND = "hellomomo.prevSentence";
const NEXT_WORD_COMMAND = "hellomomo.nextSentence";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const player = new Player(context);
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const IdBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -102
  );
  const prevBtn = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -103
  );
  const nextBtn = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -104
  );
  const PlayBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -105
  );
  const SentenceBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -106
  );

  IdBar.text = "";
  prevBtn.text = "<";
  prevBtn.tooltip = "Previous Sentence";
  prevBtn.command = PREV_WORD_COMMAND;
  nextBtn.text = ">";
  nextBtn.tooltip = "Next Sentence";
  nextBtn.command = NEXT_WORD_COMMAND;
  SentenceBar.command = CHANG_LANGUAGE_COMMAND;
  SentenceBar.command = CHANG_LANGUAGE_COMMAND2;
  PlayBar.text = "▶";
  PlayBar.command = PLAY_COMMAND;

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    ...[
      vscode.commands.registerCommand(START_COMMAND, () => {
        player.isStart = !player.isStart;
        if (player.isStart) {
          initializeBar();
          IdBar.show();
          prevBtn.show();
          nextBtn.show();
          SentenceBar.show();
          PlayBar.show();
        } else {
          IdBar.hide();
          prevBtn.hide();
          nextBtn.hide();
          SentenceBar.hide();
          PlayBar.hide();

          player.isPlaying = false;
          player.timer !== null ? clearInterval(player.timer) : 0;
        }
        // The code you place here will be executed every time your command is executed
        vscode.window.showInformationMessage(`Keep going!`);
      }),
      vscode.commands.registerCommand(PREV_WORD_COMMAND, () => {
        player.prevWord();
        initializeBar();
      }),
      vscode.commands.registerCommand(NEXT_WORD_COMMAND, () => {
        player.nextWord();
        initializeBar();
      }),
      vscode.commands.registerCommand(PLAY_COMMAND, () => {
        player.isPlaying = player.isPlaying ? false : true;
        if (player.isPlaying) {
          initializeBar();
          let count = 0;
          player.timer = setInterval(() => {
            if (count == 0) {
              player.changelanguage();
              count++;
            } else if (count == 1) {
              player.changelanguage();
              player.nextWord();
              count = 0;
            }
            initializeBar();
          }, 9000);
        } else {
          player.timer !== null ? clearInterval(player.timer) : 0;
          initializeBar();
        }
      }),
      vscode.commands.registerCommand(CHANG_LANGUAGE_COMMAND, () => {
        player.changelanguage();
        initializeBar();
      }),
      vscode.commands.registerCommand(CHANG_LANGUAGE_COMMAND2, () => {
        player.changelanguage();
        initializeBar();
      }),
    ]
  );

  function setUpSentenceBar() {
    SentenceBar.text = player.getInitialWordBarContent();
    PlayBar.text = player.isPlaying ? "||" : "▶";
    IdBar.text = `${player.getCurrentId()}`;
    // IdBar.text = `${((player.getCurrentId() / player.total()) * 100).toFixed(
    //   2
    // )}%`;
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
