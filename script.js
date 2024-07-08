const fromText = document.querySelector(".input-text");
const toText = document.querySelector(".output-text");
const selectTag = document.querySelectorAll("select");
const exchangeIcon = document.querySelector(".swap");
const translateBtn = document.querySelector(".bottom");
const icons = document.querySelector("#speaker");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if (id == 0 && country_code == "en-GB"){
            selected = "selected"
        }
        else if (id == 1 && country_code == "hi-IN"){
            selected = "selected"
        }
        let option = ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);

    }
});

console.log(toText + " " + fromText);

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", () => {
    let text = fromText.value;
    translateFrom = selectTag[0].value;
    translateTo = selectTag[1].value;
    if (!text){
        return;
    }
    toText.setAttribute("placeholder", "Translating..");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    })
});


icons.addEventListener("click", ({target}) => {
    if ('speechSynthesis' in window) {
        let utterance;
        if (target.id === "from" && fromText && selectTag[0]) {
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = selectTag[0].value;
        } else if (target.id !== "from" && toText && selectTag[1]) {
            utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = selectTag[1].value;
        } else {
            console.error('Required elements are not found or target.id is invalid.');
            return;
        }
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Speech synthesis is not supported in this browser.');
    }
});
