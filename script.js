const api = "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";
const inp = document.getElementById('inp');
const images = document.querySelector('.images');

const loadImage = async (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
};

const getImage = async () => {
    const methods = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api}`
        },
        body: JSON.stringify({
            "prompt": inp.value,
            "n": 1,
            "size": "256x256"
        })
    };

    const res = await fetch("https://api.openai.com/v1/images/generations", methods);

    const data = await res.json();
    const listImages = data.data;


    for (const photo of listImages) {
        images.innerHTML = '';

        const container = document.createElement("div");
        images.append(container);

        const img = await loadImage(photo.url);
        container.append(img);
    }
};

getImage();
