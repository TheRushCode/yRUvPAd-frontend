const BACKEND_URL = "https://yruvpad-backend-production.up.railway.app";

async function downloadVideo() {
    const url = document.getElementById("url").value;
    const resolution = document.getElementById("resolution").value;
    const status = document.getElementById("status");

    if (!url) {
        status.innerHTML = "❌ Please enter a YouTube URL";
        return;
    }

    status.innerHTML = "⏳ Downloading... Please wait";

    try {
        const response = await fetch(`${BACKEND_URL}/download`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url,
                resolution: resolution
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || "Download failed");
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "video.mp4";
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

        status.innerHTML = "✅ Download started";

    } catch (error) {
        console.error(error);
        status.innerHTML = "❌ Error downloading video";
    }
}
