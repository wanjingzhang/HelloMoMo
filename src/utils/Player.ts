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
  public isOnly: boolean;
  public curChapter: number;
  private chapters: any;

  constructor(context: vscode.ExtensionContext) {
    const globalState = context.globalState;
    this._globalState = globalState;
    this.currentId = this._globalState.get("currentId") || 0;
    this.language = "en";
    this.isStart = false;
    this.isPlaying = false;
    this.timer = null;
    this.isOnly = true;
    this.chapters = {
      1: 0,
      2: 84,
      3: 175,
      4: 279,
      5: 378,
      6: 502,
      7: 624,
      8: 734,
      9: 842,
      10: 965,
      11: 1085,
      12: 1198,
      13: 1312,
      14: 1418,
      15: 1536,
    };
    this.curChapter = 1;
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

  nextChapter() {
    if (this.curChapter < 15) {
      this.curChapter += 1;
    } else {
      this.curChapter = 1;
    }

    var curID = this.chapters[this.curChapter];
    this.currentId = curID;

    this._globalState.update("currentId", curID);
    return this.currentSentence[this.language];
  }

  prevWord() {
    if (this.currentId >= 1) {
      this.currentId -= 1;
    } else {
      this.currentId = datasource.length - 1;
    }

    for (let i in this.chapters) {
      if (this.currentId == this.chapters[i]) {
        this.curChapter = Number(i);
      }
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

    for (let i in this.chapters) {
      if (this.currentId == this.chapters[i]) {
        this.curChapter = Number(i);
      }
    }
    this._globalState.update("currentId", this.currentId);
    return this.currentSentence[this.language];
  }

  changelanguage() {
    this.language = this.language == "en" ? "zh" : "en";
  }
}
