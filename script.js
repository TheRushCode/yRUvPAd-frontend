function downloadVideo() {
    const url = document.getElementById("url").value.trim();
    const resolution = document.getElementById("resolution").value;
    const status = document.getElementById("status");

    if (!url) {
        status.innerText = "❌ Please enter a YouTube URL";
        return;
    }

    status.innerText = "⏳ Downloading… Please wait";

    fetch("https://yruvpad-backend-production.up.railway.app/download", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: url,
            resolution: resolution
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Download failed");
        }
        return response.blob();
    })
    .then(blob => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "video.mp4";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

        status.innerText = "✅ Download started";
    })
    .catch(error => {
        console.error(error);
        status.innerText = "❌ Error downloading video";
    });
}
