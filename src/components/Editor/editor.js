import React, {
  useState,
  useCallback,
  useMemo,
} from "react";

import {
  Editor,
  createEditor,
} from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlate,  } from "slate-react";
import "./editor.css";
import { FaHighlighter } from "react-icons/fa";
import Person from "../../assets/person.jpg";
function TextEditor(props) {

  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [high, setHigh] = useState("");
 

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

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underlined) {
      children = <u>{children}</u>;
    }
    if (leaf.highlighted) {
      setHigh(children);
      console.log(high);
      children = <span style={{ backgroundColor: "pink" }}>{children}</span>;
    }

    return <span {...attributes}>{children}</span>;
  };

  const FormatButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
      <button
        className="icon_btn"
        reversed
        onClick={() => toggleMark(editor, format)}
      >
        <FaHighlighter />
      </button>
    );
  };

  return (
    <div className="">
      <div className="speaker_div">
        <Slate editor={editor} value={props.value}>
          <div className="avatar_div">
            <img src={Person} alt="avatar" />
            <p>Speaker {props.index + 1}</p>
          </div>
          {high !== "" && (
            <div className="tags">
              <p>{high}</p>
            </div>
          )}
          <FormatButton format="highlighted" icon="bold" />
          <Editable renderLeaf={renderLeaf} />
        </Slate>
      </div>
    </div>
  );
}

export default TextEditor;
