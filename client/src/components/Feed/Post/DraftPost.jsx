import { useState } from "react";
import "./Draft.css"
// import { useParams } from "react-router-dom";

const CreatePost = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const sessionToken = localStorage.getItem("sessionToken");
    const api = import.meta.env.VITE_API_URI;
    const [postDraft, setPostDraft] = useState({
        title: "",
        content: "",
        caption: "",
        image: null, // Add image field
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setPostDraft((prevDraft) => ({
                ...prevDraft,
                image: files[0],
            }));
        } else {
            setPostDraft((prevDraft) => ({
                ...prevDraft,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", postDraft.title);
        formData.append("content", postDraft.content);
        formData.append("caption", postDraft.caption);
        formData.append("image", postDraft.image);

        try {
            const response = await fetch(`${api}/create_post/${user.username}/${sessionToken}/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${sessionToken}`,
                },
                body: formData,
            });
            const data = await response.json();
            if (data.status === "success") {
                alert("Post created successfully!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="draft">
            <input
                type="text"
                name="title"
                value={postDraft.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <input
                type="text"
                name="caption"
                value={postDraft.caption}
                onChange={handleChange}
                placeholder="Caption"
                required
            />
            <textarea
                name="content"
                value={postDraft.content}
                onChange={handleChange}
                placeholder="Content"
                required
            />
            <input
                type="file"
                name="image"
                onChange={handleChange}
                required
            />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;