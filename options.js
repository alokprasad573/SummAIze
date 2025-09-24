document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(["apikey"], (result) => {
        if (result.apikey) {
            document.getElementById("apikey").value = result.apikey;
        }
    });

    document.getElementById("save-button").addEventListener("click", () => {
        const apikey = document.getElementById("apikey").value.trim();
        if (!apikey) {
            return;
        }

        chrome.storage.sync.set({ apikey }, () => {
            const status = document.getElementById("success-message");
            status.style.display = "block";
            setTimeout(() => {
                window.close();
            }, 2000);
        });
    });
});