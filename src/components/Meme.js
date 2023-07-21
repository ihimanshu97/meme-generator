import React, { useState, useEffect } from "react";

export default function Meme() {

    const [allMemeImages, setAllMemeImages] = useState([]);
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes))
    }, []);

    function getMemeImage() {
        let randomNumber = Math.floor(Math.random() * allMemeImages.length);
        let memeImage = allMemeImages[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: memeImage
        }));
    }

    function handleChange(event) {
        setMeme(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image;
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="Meme " className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}