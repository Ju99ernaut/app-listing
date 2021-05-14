import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const DynamicEditor = () => {
    return (
        <Editor
            initialValue="hello world"
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            theme="dark"
            useCommandShortcut={true}
            usageStatistics={false}
        />
    );
}

export default DynamicEditor;