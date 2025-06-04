import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useLayoutEffect } from "react";
import {
  FaItalic,
  FaListOl,
  FaListUl,
  FaParagraph,
  FaRedo,
  FaStrikethrough,
  FaUndo,
} from "react-icons/fa";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="flex gap-1 flex-wrap [&>button]:bg-slate-200 [&>button]:rounded-md [&>button]:p-1 [&>button]:text-sm [&>button]:font-semibold [&>button]:disabled:opacity-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <i>
            <FaItalic />
          </i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active stroke-1" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <FaParagraph />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          T1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          T2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          T3
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          T4
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          T5
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          T6
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          {"< />"}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          {'""'}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Linha
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Pular linha
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setColor("#000000").run()}
          className={
            editor.isActive("textStyle", { color: "#000000" })
              ? "is-active"
              : ""
          }
        >
          <div className="bg-[#000000] p-2"></div>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setColor("#ff0000").run()}
          className={
            editor.isActive("textStyle", { color: "#ff0000" })
              ? "is-active"
              : ""
          }
        >
          <div className="bg-[#ff0000] p-2"></div>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setColor("#00ff00").run()}
          className={
            editor.isActive("textStyle", { color: "#00ff00" })
              ? "is-active"
              : ""
          }
        >
          <div className="bg-[#00ff00] p-2"></div>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setColor("#0000ff").run()}
          className={
            editor.isActive("textStyle", { color: "#0000ff" })
              ? "is-active"
              : ""
          }
        >
          <div className="bg-[#0000ff] p-2"></div>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setColor("#e1441e").run()}
          className={
            editor.isActive("textStyle", { color: "#e1441e" })
              ? "is-active"
              : ""
          }
        >
          <div className="bg-[#e1441e] p-2"></div>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setColor("#f544ff").run()}
          className={
            editor.isActive("textStyle", { color: "#f544ff" })
              ? "is-active"
              : ""
          }
        >
          <div className="bg-[#f544ff] p-2"></div>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          <div className="bg-[#958DF1] p-2"></div>
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export default function Tiptap({
  initialContent,
  onChange,
}: {
  initialContent: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions,
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: "px-2 py-3",
      },
    },
  });

  useLayoutEffect(() => {
    if (editor) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  return (
    <div className="p-4 px-2 border-2 rounded-[10px]">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
