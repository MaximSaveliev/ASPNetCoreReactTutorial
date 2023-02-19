import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function PostUpdateForm(props) {
    const initialFormData = Object.freeze({
        title: props.post.title,
        content: props.post.content
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postToUpdate = {
            postId: props.post.postId,
            title: formData.title,
            content: formData.content
        };

        const url = Constants.API_URL_UPDATE_POST;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onPostUpdated(postToUpdate);
    };

    return (
        <div className="container mx-auto text-center content-center">
            <form className="w-full px-5">
                <h1 className="mt-5 text-3xl">Updating the post titled "{props.post.title}".</h1>
                <div className="my-3">
                    <label className="text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white">Post title</label>
                    <input value={formData.title} name="title" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
                </div>

                <div className="my-3">
                    <label className="text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white">Post content</label>
                    <input value={formData.content} name="content" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
                </div>

                <button onClick={handleSubmit} className="block text-white font-medium bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mb-2 mx-auto w-3/6">Submit</button>
                <button onClick={() => props.onPostUpdated(null)} className="block text-white font-medium bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mb-2 mx-auto w-3/6">Cancel</button>
            </form>
        </div>
    );
}
