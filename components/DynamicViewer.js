import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

const DynamicViewer = () => {
    return (
        <Viewer
            initialValue="hello world"
            height="600px"
            theme="dark"
            usageStatistics={false}
        />
    );
}

export default DynamicViewer;