import React from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
const SimpleImage = require('@editorjs/simple-image');

interface EditorProps {
  initialBlocks?: OutputData['blocks'];
  onChange: (blocks: OutputData['blocks']) => void;
}

export const Editor: React.FC<EditorProps> = ({ onChange, initialBlocks }) => {
  React.useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      data: { blocks: initialBlocks },
      placeholder: 'Введите текст вашей статьи',
      tools: {
        image: SimpleImage,
      },
      async onChange() {
        const { blocks } = await editor.save();
        onChange(blocks);
      },
    });
    return () => {
      editor.isReady.then(() => editor.destroy()).catch((e) => console.error('Errrrrr editor'));
    };
  }, []);
  return <div id='editor' />;
};
