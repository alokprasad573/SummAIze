function getArticleText() {
    const article = document.querySelector('article');
    if (article) {
        return article.innerText;
    }

    const paragraphs = Array.from(document.getElementsByTagName('p'));
    if (paragraphs.length > 0) {
        return paragraphs.map(p => p.innerText).join('\n\n');
    }

}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "GET_ARTICLE_TEXT") {
        const articleText = getArticleText();
        sendResponse({ text: articleText });
    }
});