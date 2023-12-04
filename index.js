let currentsituation = true;
const variable = ["--color1", "--color2", "--color3", "--color4", "--text-bg"];
const value = ["blueviolet", "black", "#212121", "white", "gray"];
const variable2 = ["--color1", "--color2", "--color3", "--color4", "--text-bg"];
const value2 = ["lawngreen", "white", "wheat", "black", "white"];
const darkmodeBtn = document.querySelector(".circle");
const darkmodeBtnparent = darkmodeBtn.parentElement;
const chat = document.querySelector(".chat");
const input = document.querySelector("input");
const send = document.querySelector(".circle2");
const mediaQueryObj = window.matchMedia("(prefers-color-scheme: dark)");
let isDarkMode = mediaQueryObj.matches;
async function getres(inputvalue) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${inputvalue}`
    );
    const data = await response.json();
    const sourceurl = data[0].sourceUrls[0];
    const meanings = data[0].meanings;
    const span = document.createElement("span");
    const a = document.createElement("a");
    span.setAttribute("class", "chat-text chat-text-even");
    for (let i = 0; i < meanings.length; i++) {
      const partOfSpeech = meanings[i].partOfSpeech;
      const li = document.createElement("li");
      const lispan = document.createElement("span");
      lispan.setAttribute("class", "li-span");
      lispan.appendChild(document.createTextNode(`"${partOfSpeech}"`));
      li.innerHTML = `As `;
      li.appendChild(lispan);
      span.appendChild(li);
      for (let j = 0; j < meanings[i].definitions.length; j++) {
        const p = document.createElement("p");
        const meaning = meanings[i].definitions[j];
        const text = `<span class="red">Meaning:</span> ${meaning.definition}`;
        p.innerHTML = `${text}`;
        if (meaning.example != undefined) {
          p.innerHTML = `${text} <br/> <span class="blue">Example:</span> ${meaning.example}`;
          span.appendChild(p);
          continue;
        }
        span.appendChild(p);
      }
    }
    a.setAttribute("class", "li-span");
    a.setAttribute("href", sourceurl);
    a.setAttribute("target", "_blank");

    a.appendChild(document.createTextNode("More info...."));
    span.appendChild(a);
    return span;
  } catch (error) {
    console.log(error);
  }
}

function setrootincss(variable, value) {
  for (let i = 0; i < variable.length; i++) {
    document.documentElement.style.setProperty(`${variable[i]}`, `${value[i]}`);
  }
}
function changes() {
  if (isDarkMode) {
    isDarkMode = !isDarkMode;
    currentsituation = !currentsituation;
  }
  // console.log(currentsituation);
  if (currentsituation) {
    setrootincss(variable, value);
    darkmodeBtnparent.style.justifyContent = "flex-end";
    currentsituation = !currentsituation;
  } else {
    setrootincss(variable2, value2);
    darkmodeBtnparent.style.justifyContent = "flex-start";
    currentsituation = !currentsituation;
  }
}
function addText(typeofadd, inputvalue) {
  const div = document.createElement("div");
  const p = document.createElement("p");
  if (typeofadd) {
    const text = document.createTextNode(inputvalue);
    div.setAttribute("class", "chat-odd");
    p.setAttribute("class", "chat-text chat-text-odd");
    p.appendChild(text);
    div.appendChild(p);
    chat.appendChild(div);
    chat.scrollTo(0, chat.scrollHeight);
  } else {
    const text = document.createTextNode("Finding....");
    div.setAttribute("class", "chat-even");
    p.setAttribute("class", "chat-text chat-text-even");
    p.appendChild(text);
    div.appendChild(p);
    chat.appendChild(div);
    chat.scrollTo(0, chat.scrollHeight);
    setTimeout(() => {
      chat.lastElementChild.remove();
      if (inputvalue != "") {
        getres(inputvalue).then((e) => {
          const div = document.createElement("div");
          div.setAttribute("class", "chat-even");
          if (e != undefined) {
            div.appendChild(e);
          } else {
            const p = document.createElement("p");
            p.setAttribute("class", "chat-text chat-text-even");
            p.appendChild(
              document.createTextNode(
                "Something went wrong! please Check the word sir."
              )
            );
            div.appendChild(p);
          }
          chat.appendChild(div);
          chat.scrollTo(0, chat.scrollHeight);
        });
      }
    }, 1000);
  }
}
darkmodeBtn.addEventListener("click", (e) => {
  changes();
  e.stopPropagation();
});
darkmodeBtnparent.addEventListener("click", (e) => {
  changes();
  e.stopPropagation();
});
send.addEventListener("click", () => {
  const userinputvalue = input.value;
  if (userinputvalue != "") {
    console.log(userinputvalue);
    addText(true, userinputvalue);
    input.value = "";
    setTimeout(() => {
      addText(false, userinputvalue);
    }, 500);
  }
});
document.addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    const userinputvalue = input.value;
    if (userinputvalue != "") {
      console.log(userinputvalue);
      addText(true, userinputvalue);
      input.value = "";
      setTimeout(() => {
        addText(false, userinputvalue);
      }, 500);
    }
  }
});
