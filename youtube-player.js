var player;
var video;
var firstPause = true;
var isDoubleClicked = false;

function adShowing() {
    if (player) {
        return player.classList.contains("ad-showing");
    }
    return false;
}

function handlePlay() {
    if (adShowing()) {
        firstPause = true;
        video.muted = true;
    } else if (firstPause) {
        firstPause = false;
        video.pause();
        video.muted = false;
    }
}

function stopVideo() {
    player = document.getElementById("movie_player");
    if (player) {
        video = player.getElementsByTagName("video")[0];
        if (video) {
            video.addEventListener("play", handlePlay);
            video.addEventListener("playing", handlePlay);
            video.addEventListener("emptied", function () { firstPause = true; });
        }
    }
}

function showNotification() {
    var notification = document.getElementById("external_player_notification");
    if (!notification) {
        var notificationSpan = document.createElement("span");
        notificationSpan.innerHTML = "Opening in external player";
        notification = document.createElement("div");
        notification.setAttribute("id", "external_player_notification");
        notification.appendChild(notificationSpan);
        document.body.appendChild(notification);
    }
    notification.style.top = "10px";
    setTimeout(function () { notification.style.top = "-40px"; }, 10000);
}

function playInExternalPlayer(link) {
    showNotification();
    var newWindow = window.open(link, "_blank");
    setTimeout(function () { newWindow.close(); }, 200);
}

function insertPlayerLink() {
    var headline = document.getElementById("watch7-headline");
    if (headline) {
        var link = document.URL.replace(/https?/, "youtube");

        var playerButton = document.createElement("span");
        playerButton.setAttribute("class", "yt-uix-button yt-uix-button-text");
        playerButton.setAttribute("style", "font-size: 1.5em; margin-left: 2.5em;");
        playerButton.innerHTML = "Play externally";

        var playerLink = document.createElement("a");
        playerLink.setAttribute("href", link);
        playerLink.setAttribute("style", "text-decoration: none;");
        playerLink.addEventListener("click", showNotification);
        playerLink.appendChild(playerButton);

        headline.appendChild(playerLink);

        if (isDoubleClicked) {
            playInExternalPlayer(link);
        }
    }
}

function documentLoaded() {
    stopVideo();
    insertPlayerLink();
}

function handleInsertEvent(e) {
    if (e.target.nodeName === "VIDEO") {
        stopVideo();
    } else if (e.target.nodeName === "DIV" && e.target.id === "watch7-container") {
        insertPlayerLink();
    }
}

document.addEventListener("DOMContentLoaded", documentLoaded, true);
document.addEventListener("DOMNodeInserted", handleInsertEvent, true);
document.addEventListener("click", function () { isDoubleClicked = false; }, true);
document.addEventListener("dblclick", function () { isDoubleClicked = true; }, true);
