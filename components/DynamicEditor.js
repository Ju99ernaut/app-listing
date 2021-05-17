import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const DynamicEditor = ({ value }) => {
    return (
        <Editor
            initialValue={value || "hello world"}
            previewStyle="tab"
            height="600px"
            initialEditType="markdown"
            theme="dark"
            useCommandShortcut={true}
            usageStatistics={false}
        />
    );
}

export default DynamicEditor;