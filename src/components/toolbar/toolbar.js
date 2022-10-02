import React,{useState} from "react";

import Font from "../../assets/Vector (3).png";
import Left from "../../assets/Vector (4).png";
import Center from "../../assets/Vector (5).png";
import List from "../../assets/Vector (6).png";
import Para from "../../assets/Vector (7).png";
import Link from "../../assets/Vector (8).png";
import Image from "../../assets/Vector (9).png";
import Emoji from "../../assets/Vector (10).png";
import Plus from "../../assets/Vector(11).png";
import EmojiPicker from "emoji-picker-react";
import {Button, Form, Modal} from "react-bootstrap"
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import "./toolbar.css";
function Toolbar({toggleMark, isMarkActive,isBlockActive,toggleBlock,onPlusClick,setWebLink,setLinkText}) {
    const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
    const editor=useSlate();
    console.log(editor);
    const [show,setShow]=useState(false);
    const [text,setText]=useState("");
    const [link,setLink]=useState("");

 
function openModal(){
setShow(true);
}
function closeModal(){
  setShow(false);
}

  const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
      <button
        className={isMarkActive(editor,format)?`toolbar_icon active`:"toolbar_icon"}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
      >
        {icon}
      </button>
    );
  };

  

  const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
      <button
        active={isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
        )}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
      >
    {icon}
      </button>
    );
  };
  function handleChange(e){
    e.preventDefault();
    const {name,value}=e.target;
    if(name=="link"){
      setLink(value);
    }
    if(name=="text"){
      setText(value);
    }
  }


  return (
    <div className="toolbar_main">
     
      <div className="left_half">
        <MarkButton format="bold" icon="B"></MarkButton>
        <MarkButton format="italic" icon="i"></MarkButton>
        <MarkButton format="underline" icon="U"></MarkButton>

        <img
          onClick={(e) => {
            e.preventDefault();
            toggleMark();
          }}
          src={Font}
          alt="Font icon"
        />
        <img
          onClick={(e) => {
            e.preventDefault();
            toggleBlock(editor, "left");
          }}
          src={Left}
          alt="Left Align icon"
        />
        <img
          onClick={(e) => {
            e.preventDefault();
            toggleBlock(editor, "center");
          }}
          src={Center}
          alt="Center Align icon"
        />
        <img
          onClick={(e) => {
            e.preventDefault();
            toggleBlock(editor, "numbered-list");
          }}
          src={List}
          alt="List icon"
        />
        <img
          onClick={(e) => {
            e.preventDefault();
            toggleMark();
          }}
          src={Para}
          alt="Para icon"
        />
        <img
          onClick={(e) => {
            e.preventDefault();
            
          }}
          src={Link}
          alt="link-icon"
        />
        <img
          onClick={(e) => {
            e.preventDefault();
          }}
          src={Image}
          alt="Pic icon"
        />
        <img
          onClick={(e) => {
            e.preventDefault();
            toggleMark();
          }}
          src={Emoji}
          alt="Emoji icon"
        />
        <img
          onClick={(e) => {
            e.preventDefault();
            onPlusClick(editor);
          }}
          src={Plus}
          alt="Plus icon"
        />
      </div>
      <div className="right_half"></div>
    </div>
  );
}

export default Toolbar;
