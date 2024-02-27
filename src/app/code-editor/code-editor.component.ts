import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from 'codemirror';
import { Language, language } from "@codemirror/language";
import { oneDarkTheme } from '@codemirror/theme-one-dark';
import { pythonLanguage } from '@codemirror/lang-python';
import {tags} from "@lezer/highlight"
import {HighlightStyle} from "@codemirror/language"
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {
  @ViewChild('editor') editorElementRef!: ElementRef<HTMLDivElement>;
  ngAfterViewInit() {
// const myHighlightStyle = HighlightStyle.define([
//   {tag: tags.keyword, color: "#000"},
//   {tag: tags.comment, color: "#f5d", fontStyle: "italic"}
// ])
let myTheme = EditorView.theme({
  "&": {
    color: "white",
    backgroundColor: "#034"
  },
  ".cm-content": {
    caretColor: "#0e9"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#0e9"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#074"
  },
  ".cm-gutters": {
    backgroundColor: "#045",
    color: "#ddd",
    border: "none"
  }
}, {dark: false})
    const editorView = new EditorView({
      state: EditorState.create({
        doc: `def hello_world():
    print("Hello, world!")

hello_world()`,
        extensions: [
          basicSetup,
          pythonLanguage,
          oneDarkTheme
        ]
      }),
      parent: this.editorElementRef.nativeElement,
    });
  }
}
