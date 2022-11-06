import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EntryForm from '../../components/entryform/entryForm';
import Loading from '../../components/loading/Loading';
import { createEntry, selectIsLoading } from '../../redux/features/entries/entry_slice';

const initialState = {
    title: "",
    author: "",
    format: "",
    release: "",
    edition: "",
    barcode: ""
}

const AddEntry = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [entry, setEntry] = useState(initialState)
    const [entryImage, setEntryImage] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [notes, setNotes] = useState("")

    const isLoading = useSelector(selectIsLoading)

    const {title, author, format, release, edition, barcode, quantity} = entry

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEntry({ ...entry, [name]: value });
      };

    const handleImageChange = (e) => {
        setEntryImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
      }

    const saveEntry = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", title)
        formData.append("author", author)
        formData.append("format", format)
        formData.append("release", release)
        formData.append("edition", edition)
        formData.append("barcode", barcode)
        formData.append("quantity", quantity)
        formData.append("image", entryImage)

        console.log(...formData)

        await dispatch(createEntry(formData))

        navigate('/dash')
    }

    return (
        <div>
            <h3 className="--mt">Add New Item</h3>
            {isLoading && <Loading />}
            <EntryForm 
                entry={entry}
                entryImage={entryImage}
                imagePreview={imagePreview}
                notes={notes}
                setNotes={setNotes}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                saveEntry={saveEntry}
            />
        </div>
    )
}

export default AddEntry;