function insertPlayerLink() {
    var link = document.URL.replace(/https?/, "youtube");

    var playerButton = document.createElement("span");
    playerButton.setAttribute("class", "yt-uix-button yt-uix-button-text");
    playerButton.setAttribute("style", "font-size: 1.5em; margin-left: 2.5em;");
    playerButton.innerHTML = "Play externally";

    var playerLink = document.createElement("a");
    playerLink.setAttribute("href", link);
    playerLink.setAttribute("style", "text-decoration: none;");
    playerLink.appendChild(playerButton);

    var headline = document.getElementById("watch7-headline");
    headline.appendChild(playerLink);
}

function handleInsertEvent(e) {
    if (e.target.nodeName === "DIV" && e.target.id === "watch7-container") {
        insertPlayerLink();
    }
}

document.addEventListener("DOMContentLoaded", insertPlayerLink, true);
document.addEventListener("DOMNodeInserted", handleInsertEvent, true);
