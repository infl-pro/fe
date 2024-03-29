import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './customEditorStyle.css';
import Quill from 'react-quill';

// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
//     ssr: false,
//     loading: () => <p>Loading ...</p>,
// });

interface TextEditorProps {
    content?: string;
    // onChange: (field: string, value: string) => void;
    onChange: (value: string) => void;
    hasError?: boolean;
}

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        // ['image'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
];

const TextEditor: React.FC<TextEditorProps> = ({
    content,
    onChange,
    hasError,
}) => {
    return (
        <Quill
            modules={modules}
            placeholder="상품 상세 내용을 입력해주세요"
            formats={formats}
            theme="snow"
            value={content}
            onChange={(content, delta, source, editor) => {
                onChange(editor.getHTML());
            }}
            className={hasError ? 'ql-error' : null}
        />
    );
};

export default TextEditor;
