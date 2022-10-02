import './App.css';
// Import React dependencies.
import React, { useState,useCallback,useMemo  } from 'react'
// Import the Slate editor factory.

import {
  Editor,
  Transforms,
  createEditor,
  
  Element as SlateElement,
} from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact,useSlateStatic,ReactEditor,useFocused,useSelected} from "slate-react";
import Header from "./components/header/header";
import Toolbar from './components/toolbar/toolbar';
import MultiEditor from "./components/Editor/editor";
import { css } from "@emotion/css";

import AddImage from './components/image/image.js';
function App() {
  const initialValue = [
    {
      type: "paragraph",
      align:"left",
      children: [
        { text: "There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassages of Lorem Ipsum available, but the majority have salteration in some form, by injected humour, or randomised wowhich don't look even slightly believable. If you are going to use a passage. There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassages of Lorem Ipsum available, but the majority have salteration in." },
      ],
    }
  ];
  const [value,setValue]=useState(initialValue);
  const LIST_TYPES = ["numbered-list"];
  const TEXT_ALIGN_TYPES = ["left", "center"];
  const editor = useMemo(() =>  (withReact(createEditor())), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />,[]);
  const [ListValues,setListValues]=useState([]);
  const [webLink, setWebLink] = useState("");
  const [linktext,setLinkText]=useState("");
  
  

  const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  console.log(editor);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};


  const isBlockActive = (editor, format, blockType = "type") => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      })
    );

    return !!match;
  };


const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};




  const Element = (props) => {
     const { attributes, children, element } = props;
    const style = { textAlign: element.align };
    switch (element.type) {
      case "list-item":
        return (
          <li style={style} {...attributes}>
            {children}
          </li>
        );
      case "numbered-list":
        return (
          <ol style={style} {...attributes}>
            {children}
          </ol>
        );
      case "image":
        return <AddImage {...props} />;

      case "link":
        return (
          <p style={style} {...attributes}>
            {children}

            <a
              style={style}
              {...attributes}
              href={webLink}
            >
              {linktext}
            </a>
          </p>
        );
      default:
        return (
          <p style={style} {...attributes}>
            {children}
          </p>
        );
    }
  };

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underline) {
      children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
  };

  function onPlusClick(editor){
    console.log();
    setListValues((e) => [...e,value]);
    
  }
 

  
  
  return (
    <div className="App">
      <Header />
      <div className="editor_div">
        <h1>John Doe Interview</h1>
        <Slate editor={editor} value={value}>
          <Toolbar
            toggleMark={toggleMark}
            isMarkActive={isMarkActive}
            isBlockActive={isBlockActive}
            toggleBlock={toggleBlock}
            setWebLink={setWebLink}
            setLinkText={setLinkText}
            onPlusClick={onPlusClick}
            
          />
          <Editable
            onChange={(e) => setValue(e.target.value)}
            value={value}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      </div>
      {ListValues &&
        ListValues.length>0 && (
            <div className="editor_main">
              <h4>Box 1</h4>
              {ListValues.map((val,i) => (
                <MultiEditor value={val} index={i}/>
              ))}
            </div>
          )}
    </div>
  );

  
}

export default App;
