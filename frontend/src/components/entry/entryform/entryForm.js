import React from "react";
import { FaProductHunt } from "react-icons/fa";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Card from "../../card/Card";
import './entryForm.scss'

const EntryForm = ({
    entry, 
    entryImage, 
    imagePreview, 
    notes, 
    setNotes, 
    handleInputChange, 
    handleImageChange, 
    saveEntry
}) => {
    return (
    <div className="add-entry">
        <Card cardClass={"card"}>
            <form onSubmit={saveEntry}>
                <Card cardClass={"group"}>
                    <label>Image</label>
                    <code className="=--color-dark">JPG, JPEG, or PNG</code>
                    <input type="file" name="image" onChange={(e) => handleImageChange(e)} />

                    {imagePreview != null ? (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Your item" />
                        </div>
                    ) : (<p>No image</p>)}
                </Card>
                <label>Title/Name:</label>
                <input type="text" placeholder="Title/Name" name="title" value={entry?.title} onChange={handleInputChange} />

                <label>Author/Artist:</label>
                <input type="text" placeholder="Author/Artist" name="author" value={entry?.author} onChange={handleInputChange} />

                <label>Format:</label>
                <input type="text" placeholder="Format" name="format" value={entry?.format} onChange={handleInputChange} />

                <label>Release Date:</label>
                <input type="text" placeholder="Release Date" name="release" value={entry?.release} onChange={handleInputChange} />

                <label>Edition:</label>
                <input type="text" placeholder="Edition:" name="edition" value={entry?.edition} onChange={handleInputChange} />

                <label>Bardcode:</label>
                <input type="text" placeholder="Barcode" name="barcode" value={entry?.barcode} onChange={handleInputChange} />

                <label>Quantity:</label>
                <input type="text" placeholder="Quantity" name="quantity" value={entry?.quantity} onChange={handleInputChange} />

                <label>Notes:</label>
                <ReactQuill theme="snow" value={notes} onChange={setNotes} modules={EntryForm.modules} formats={EntryForm.formats} />;

                <div className="--my">
                    <button type="submit" className="btn btn-primary">
                        Save Item
                    </button>
                </div>
            </form>
        </Card>
    </div>
    )
}

EntryForm.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  EntryForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
  ];
//quill module that builds the free text editor. used from react-quill documentation
export default EntryForm