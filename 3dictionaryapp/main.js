const form = document.querySelector("form");
const Result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWord(form.children[0].value);
});

async function getWord(word) {
  try {
    Result.innerHTML = `<div class="custom-loader"></div>`;
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    console.log(data);
    let definitions = data[0].meanings[0].definitions[0];

    Result.innerHTML = `
     <h2><strong>Word:</strong>${data[0].word}</h2>
     <h2><strong>Pronounce:</strong></h2>
     <audio controls>
<source src="${data[0].phonetics[0].audio}" type="audio/mp3"> 
</audio>  
     <p><h3>Part of speech:</h3>${data[0].meanings[0].partOfSpeech}</p>
     <p><strong>Meanings:</strong>${
       definitions.definition === undefined
         ? "Not found"
         : definitions.definition
     }</p>
     <p><strong>Example:</strong>${
       definitions.example === undefined ? "Not found" : definitions.example
     }</p>
     <p><strong>Synonyms & Antonyms</strong>
    
     `;
    if (definitions.antonyms.length === 0) {
      Result.innerHTML += `<span>***Antonyms Not found  </span>`;
    } else {
      for (i = 0; i < definitions.antonyms.length; i++) {
        Result.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
      }
    }

    if (data[0].meanings[0].synonyms.length === 0) {
      Result.innerHTML += `<span>***Synonyms Not found </span>`;
    } else {
      for (i = 0; i <data[0].meanings[0].synonyms.length; i++) {
        Result.innerHTML += `<li>${data[0].meanings[0].synonyms[i]}</li>`;  
      }
    }

    Result.innerHTML += `<p><a href="${data[0].sourceUrls}" target="_blank" class="read">Click here Read More</a></p>`;
    console.log(data);
  } catch (error) {
    Result.innerHTML = `<p>Sorry word not found</p>`;
  }
}
