import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = () => {
    const editorRef = useRef(null);
    const [html, setHtml] = useState("<p>Share your knowledge</p>");

    function onClickHandler() {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            setHtml(editorRef.current.getContent());
        }
    }

    return (
        <div>
            <Editor
                apiKey="781f8jgvl2bm8f2knu9b9yejiiuvcsv39oau368kbmjqqaf3"
                initialValue={html}
                plugins="codesample"
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    
                    menu: {
                        tc: {
                          title: 'Comments',
                          items: 'addcomment showcomments deleteallconversations'
                        }
                      },
                   menubar: 'file edit view insert format tools table tc help',
                   toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment'
                }}
                

            />
            <button
                type='button'
                onClick={onClickHandler}
            >
                Get Content
            </button>

            <Editor
            apiKey="781f8jgvl2bm8f2knu9b9yejiiuvcsv39oau368kbmjqqaf3"
                disabled={true}
                initialValue={html}
                init={{
                    setup: function (editor) {
                        editor.on('init', function () {
                            editor.setContent(html);
                        });
                    },
                    toolbar: false,
                    menubar: false,
                    statusbar: false,
                    readonly: true,
                    visual: false,
                    browser_spellcheck: false,
                    resize: false,
                   
                }}
            />
        </div>
    );
}

export default RichTextEditor;
