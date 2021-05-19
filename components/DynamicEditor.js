import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';

const DynamicEditor = ({ value, handleChange }) => {
    const tuiEditor = useRef(null)

    const getValue = () => {
        handleChange(tuiEditor.current.getInstance().getMarkdown());
    }

    return (
        <Editor
            ref={tuiEditor}
            initialValue={value || "hello world"}
            previewStyle="tab"
            height="600px"
            initialEditType="markdown"
            theme="dark"
            useCommandShortcut={true}
            usageStatistics={false}
            onChange={getValue}
        />
    );
}

export default DynamicEditor;