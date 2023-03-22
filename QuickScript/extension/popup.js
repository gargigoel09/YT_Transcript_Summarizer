if (typeof document !== 'undefined') {
    const btn = document.getElementById("summarize");
    btn.addEventListener("click", function () {
        btn.disabled = true;
        btn.innerHTML = "Summarizing....";
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            var url = tabs[0].url;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'https://ab23-122-161-65-241.in.ngrok.io/summary?youtube_url=' + url, true);
            xhr.onload = () => {

                setTimeout(() => {
                    const summary = document.getElementById("output");
                    btn.style.visibility = "hidden";
                    summary.innerHTML = xhr.responseText
                    const heading = document.getElementById("heading");
                    heading.innerHTML = 'Video Summary';
                }, 9000);

            }

            xhr.send();
        });
    });
}
