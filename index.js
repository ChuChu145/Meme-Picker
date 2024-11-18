import { catsData } from '/data.js'

const emotionOptions = document.getElementById('emotion-options')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

memeModalCloseBtn.addEventListener('click', closeModal)
getImageBtn.addEventListener('click', renderCat)
window.addEventListener('click', closeModal1) 

// Function to close modal if clicked outside modal content
function closeModal1(e) {
    if (memeModal.style.display === 'flex' && !memeModalInner.contains(e.target)) {
        closeModal();
    }
}

// Close the modal
function closeModal() {
    memeModal.style.display = 'none';
}

// Render a random cat image based on the selected emotion and gif filter
function renderCat() {
    const catObject = getSingleCatObject();
    setTimeout(() => {
        memeModalInner.innerHTML = `
            <img 
                class="cat-img" 
                src="/images/${catObject.image}"
                alt="${catObject.alt}"
            >
        `;
        memeModal.style.display = 'flex';
    }, 1000); 
}

// Get a single cat object based on selected emotion and random selection
function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();
    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomNumber];
    }
}

// Get the array of matching cats based on selected emotion and gif filter
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

// Get the list of emotions from cats data
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

// Render the emotion options in the dropdown
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

// Initialize emotion options
renderEmotionsOptions(catsData);
