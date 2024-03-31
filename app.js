const input = document.querySelector("#input");
const searchBtn = document.querySelector("#searchIcon");
const para = document.querySelector("#info");
const meaningContainer = document.querySelector("#meaning-container");
const title = document.querySelector("#title");
const meaning = document.querySelector("#meaning");
const audio = document.querySelector("#audio");
const example = document.querySelector("#example");
const loadingIcon = document.querySelector("#loadingIcon")
    // *function fetchData
async function fetchData(word) {

    try {
        info.style.display = "block";
        meaningContainer.style.display = "none";
        info.innerText = `Searching the meaning of  ${word}`;
        loadingIcon.style.display = "inline-block";
        loadingIcon.src = "./doublering.svg";
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(apiUrl);
        const data = await result.json();
        if (data.title) {
            // console.log(data.title)
            meaningContainer.style.display = "block";
            info.style.display = "none";
            loadingIcon.style.display = "none";
            title.innerText = word;
            meaning.innerText = "Not Avabilable";
            audio.style.display = 'none';
        } else {
            info.style.display = "none";
            loadingIcon.style.display = "none";
            meaningContainer.style.display = "block";
            audio.style.display = "inline-block";
            title.innerText = data[0].word;
            meaning.innerText = data[0].meanings[0].definitions[0].definition;
            example.innerText = data[0].meanings[0].definitions[0].example;
            audio.src = `${data[0].phonetics[0].audio}`;
        }

    } catch (error) {
        info.innerText = `Error happend,try again later`;
    }


}
// *input enter
input.addEventListener("keyup", (event) => {
        if (event.target.value && event.key === "Enter") {
            fetchData(event.target.value);
        }
    })
    // *search btn
searchBtn.addEventListener("click", () => {
    if (input.value) {
        fetchData(input.value)
        input.value = ""
    }
})