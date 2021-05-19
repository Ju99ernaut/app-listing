import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

const DynamicViewer = ({ value }) => {
    return (
        <Viewer
            initialValue={value || "hello world"}
            theme="dark"
            usageStatistics={false}
        />
    );
}

export default DynamicViewer;