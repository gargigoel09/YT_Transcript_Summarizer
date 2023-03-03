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
                    summary.innerHTML = "A fifth of your body's circulatory blood is channeled to it as you drift off. Memory consolidation occurs with the help of a major part of the brain, known as the hippocampus. It's role in long-term memory formation was demonstrated in the 1950s. The hippocampus was specifically involved in the consolidation of long - term declarative memory was able to learn physical tasks through repetition. It was also damaged due to the removal of his h.M.'s ability to form long term memories. Sleep is composed of four stages, the deepest of which are known as slow-wave sleep and rapid eye movement. The different stages of sleep have been shown to help consolidate different types of memories.REM sleep is associated with the consolidation of procedural memory. Skimping on sleep doesn't only harm your long-term health, but also makes it less likely that you'll retain all that knowledge and practice.";
                    const heading = document.getElementById("heading");
                    heading.innerHTML = 'Video Summary';
                }, 9000);

            }

            xhr.send();
        });
    });
}
