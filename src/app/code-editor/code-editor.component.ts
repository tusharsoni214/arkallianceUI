import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
export class CodeEditorComponent implements AfterViewInit,OnChanges {
  @ViewChild('editor') editorElementRef!: ElementRef<HTMLDivElement>;
  @Input() code:string = '';
  @Output() codeChange: EventEmitter<string> = new EventEmitter<string>();
  ngOnChanges(changes: SimpleChanges): void {
    if(this.code.includes('overandout')){
      const codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/gs;
      this.code = codeBlockRegex.exec(this.code)![2];
      console.log('Code',this.code);
      const editorView = new EditorView({
        state: EditorState.create({
          doc: this.code,
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
  updateCode(event: any) {
    this.codeChange.emit(event.target.innerText);
  }
  ngAfterViewInit() {
    const editorView = new EditorView({
      state: EditorState.create({
        doc: this.code,
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
