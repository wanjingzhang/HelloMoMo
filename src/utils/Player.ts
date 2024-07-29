import * as vscode from "vscode";
import { Sentence, LanguageType } from "./types";
import { datasource } from "./data";

export default class Player {
  private _globalState: vscode.Memento;
  public currentId: number;
  public language: LanguageType;
  public isPlaying: boolean;
  public timer: NodeJS.Timeout | null;
  public isStart: boolean;

  constructor(context: vscode.ExtensionContext) {
    const globalState = context.globalState;
    this._globalState = globalState;
    this.currentId = this._globalState.get("currentId") || 0;
    this.language = "en";
    this.isStart = false;
    this.isPlaying = false;
    this.timer = null;
  }

  get currentSentence(): Sentence {
    return datasource[this.currentId];
  }

  total() {
    return datasource.length;
  }

  getInitialWordBarContent() {
    return this.currentSentence[this.language];
  }

  getCurrentId() {
    return this.currentId;
  }

  prevWord() {
    if (this.currentId >= 1) {
      this.currentId -= 1;
    } else {
      this.currentId = datasource.length - 1;
    }

    this._globalState.update("currentId", this.currentId);
    return this.currentSentence[this.language];
  }

  nextWord() {
    if (this.currentId < datasource.length - 1) {
      this.currentId += 1;
    } else {
      this.currentId = 0;
    }
    this._globalState.update("currentId", this.currentId);
    return this.currentSentence[this.language];
  }

  changelanguage() {
    this.language = this.language == "en" ? "zh" : "en";
  }
}
