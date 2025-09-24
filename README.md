# SummAIze

SummAIze is a Chrome extension that uses Google Gemini AI to quickly summarize web content. Select text or summarize an entire page in various formats—short, detailed, bullet points, or key takeaways—directly from your browser.

## Features

- **Summarize selected text or full page content**
- **Choose summary type:** Short, Detailed, Bullet Points, or Key Takeaways
- **Copy summaries to clipboard with one click**
- **Modern, clean popup UI**
- **Secure API key storage**

## Installation

1. **Clone or download this repository.**
2. **Open Chrome and go to `chrome://extensions/`.**
3. **Enable "Developer mode".**
4. **Click "Load unpacked" and select the project folder.**

## Setup

1. Open the extension popup and click the settings (gear) icon or go to the options page.
2. Enter your [Google Gemini API key](https://aistudio.google.com/apikey).
3. Save your settings.

## Usage

1. Navigate to any web page you want to summarize.
2. Click the SummAIze extension icon.
3. Select the summary type.
4. Click **Summarize**.
5. Copy the summary if needed.

## Development

- **popup.html / popup.js** — Main extension popup and logic
- **options.html / options.js** — API key management
- **content.js** — Injected into web pages to extract text
- **manifest.json** — Chrome extension manifest

## License

MIT

---

**Made with ❤️ for productivity.**
