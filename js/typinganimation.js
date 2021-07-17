function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typingAnim() {
    await sleep(333)
    let animText = "Solomon Pierce";
    // type one letter at a time
    for (i = 0; i < 15; i++) {
        document.getElementById("myNameTyped").innerHTML = "<h1>" + animText.substring(0, i) + "_" + "</h1>";
        await sleep(150);
    }
    // pause
    await sleep(500);
    // delete one letter at a time
    for (i = 15; i > -1; i--) {
        document.getElementById("myNameTyped").innerHTML = "<h1>" + animText.substring(0, i) + "_" + "</h1>";
        await sleep(50);
    }
    document.getElementById("myNameTyped").innerHTML = "";
}
document.addEventListener("DOMContentLoaded", function (event) {
    typingAnim()
});