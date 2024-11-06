import { catsData } from '/data.js';

const emotionOptions = document.getElementById('emotion-options');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

memeModalCloseBtn.addEventListener('click', closeModal);
getImageBtn.addEventListener('click', renderCat);

// Add a window event listener to close modal when clicking outside of it
window.addEventListener('click', function(event) {
    // Check if modal is open and if the click target is outside of memeModalInner
    if (memeModal.style.display === 'flex' && !memeModalInner.contains(event.target)) {
        closeModal();
    }
});

function closeModal() {
    memeModal.style.display = 'none';
}

function renderCat() {
    const catObject = getSingleCatObject();
        memeModalInner.innerHTML = `
            <img 
                class="cat-img" 
                src="./images/${catObject.image}"
                alt="${catObject.alt}"
            >
        `;
        memeModal.style.display = 'flex';
    
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();
    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomNumber];
    }
}

function getMatchingCatsArray() {
    const selectedEmotion = document.querySelector('#emotions').value;
    const isGif = gifsOnlyOption.checked;
    
    const matchingCatsArray = catsData.filter(function(cat) {
        if (isGif) {
            return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
        } else {
            return cat.emotionTags.includes(selectedEmotion);
        }            
    });
    
    return matchingCatsArray;
}

function getEmotionsArray(cats) {
    const emotionsArray = [];    
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            }
        }
    }
    return emotionsArray;
}

function renderEmotionsOptions(cats) {
    let options = '';
    const emotions = getEmotionsArray(cats);
    
    for (let emotion of emotions) {
        options += `<option value="${emotion}">${emotion}</option>`;
    }
    
    emotionOptions.innerHTML = `
        <select id="emotions" class="emotion-select">
            ${options}
        </select>
    `;
}

renderEmotionsOptions(catsData);
