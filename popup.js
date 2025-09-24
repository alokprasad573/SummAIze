document.addEventListener("DOMContentLoaded", () => {
    const summarizeBtn = document.getElementById("summarize");
    const loader = document.getElementById("loader");
    const summaryOutput = document.getElementById("summary-output");

    if (summarizeBtn) {
        summarizeBtn.addEventListener("click", () => {
            const summaryType = document.getElementById("summary-type").value;
            if (summaryOutput) summaryOutput.textContent = "Wait a minute...";
            if (loader) loader.style.display = "block";

            chrome.storage.sync.get(['apikey'], (result) => {
                const apikey = result.apikey;
                if (!apikey) {
                    if (summaryOutput) summaryOutput.textContent = "API key is missing.";
                    if (loader) loader.style.display = "none";
                    return;
                }

                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    const tab = tabs[0];
                    chrome.tabs.sendMessage(
                        tab.id,
                        { type: "summarize" },
                        async (response) => {
                            if (chrome.runtime.lastError) {
                                if (summaryOutput) summaryOutput.textContent = "Could not connect to content script. Try refreshing the page.";
                                if (loader) loader.style.display = "none";
                                return;
                            }
                            const text = response && response.text;
                            if (!text) {
                                if (summaryOutput) summaryOutput.textContent = "No text selected.";
                                if (loader) loader.style.display = "none";
                                return;
                            }
                            try {
                                const summary = await getGeminiSummary(text, summaryType, apikey);
                                summaryOutput.textContent = summary;
                            } catch (error) {
                                if (summaryOutput) summaryOutput.textContent = "Error generating summary.";
                            }
                            if (loader) loader.style.display = "none";
                        }
                    );
                });
            });
        });
    }
});

async function getGeminiSummary(text, summaryType, apikey) {
    const max = 999999; // Set a high max token limit
    text = text.length > max ? text.slice(0, max) + "..." : text;

    const promptMap = {
        short: `Summarize in 2-3 sentences: \n\n${text}\n\n.`,
        detailed: `Give a detailed summary: \n\n${text}\n\n.`,
        bullet: `Summarize the key points in bullet points: \n\n${text}\n\n.`
    };

    const prompt = promptMap[summaryType] || promptMap.short;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text : prompt }] }],
            getGeminiSummary: { temperature: 0.2 },
        })
    });

    if (!response.ok) {
        throw new Error("API request failed");
    }

    const data = await response.json();
    console.log(data);
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No summary generated.";
}



document.getElementById("copy").addEventListener("click", () => {
    const txt = document.getElementById("summary-output").innerText;
    if (!txt) return;

    navigator.clipboard.writeText(txt).then(() => {
        const btn = document.getElementById("copy")
        const old = btn.textContent;
        btn.textContent = "Copied"
        setTimeout(() => (btn.textContent = old), 2000);
    });
});