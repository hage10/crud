
import * as ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';
function CkEditor() {
    return (
        <div className="App flex flex-column justify-content-center align-content-center">
            <CKEditor editor={ClassicEditor} onReady={(editor) => {
                editor.editing.view.change((writer) => {
                    writer.setStyle('height', 'auto', editor.editing.view.document.getRoot())
                })
            }}></CKEditor>
        </div>

    );
}
export default CkEditor;