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
  editorView:EditorView = new EditorView();
  ngOnChanges(changes: SimpleChanges): void {
    // if(this.code.includes('overandout')){
    //   this.code  = this.code.replace("overandout","")
    //   const codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/gs;
    //   this.code = codeBlockRegex.exec(this.code)![2];
    //   this.editorView = new EditorView({
    //     state: EditorState.create({
    //       doc: this.code,
    //       extensions: [
    //         basicSetup,
    //         pythonLanguage,
    //       ]
    //     }),
    //     parent: this.editorElementRef.nativeElement,
    //   });
    // }
  }
  updateCode(event: any) {
    let code = event.target.innerText
    if(code.includes("overandout")){
        code  = code.replace("overandout","")
    }
    this.codeChange.emit(code);
  }
  insertTab() {
    if (this.editorView) {
      const { from, to } = this.editorView.state.selection.main;
      this.editorView.dispatch({
        
          changes: {
            from,
            to,
            insert: '\t' // Insert tab character
          }
      });
    }
  }
  removeTab() {
    if (this.editorView) {
      const { from, to } = this.editorView.state.selection.main;
      const tabSize = this.editorView.state.tabSize;
      const selectedText = this.editorView.state.sliceDoc(from, to);
      if (selectedText.startsWith('\t')) {
        this.editorView.dispatch({
            changes: {
              from,
              to,
              insert: '',
            }
        });
      } else if (selectedText.startsWith(' '.repeat(tabSize))) {
        this.editorView.dispatch({
            changes: {
              from: from,
              to: to - tabSize,
              insert: '',
            }
          })
      }
    }
  }
  ngAfterViewInit() {
    this.editorView = new EditorView({
      state: EditorState.create({
        doc: this.code,
        extensions: [
          basicSetup,
          pythonLanguage,
        ]
      }),
      parent: this.editorElementRef.nativeElement,
    });
    this.editorElementRef.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault(); // Prevent default tab behavior
        this.insertTab(); // Insert tab character
      }else if (event.key === 'Tab' && event.shiftKey) {
        event.preventDefault(); // Prevent default shift+tab behavior
        this.removeTab(); // Remove tab character
      }
    });
  }
}
