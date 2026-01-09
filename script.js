const btn = document.getElementById("downloadBtn");
const statusText = document.getElementById("status");

btn.addEventListener("click", async () => {
  const url = document.getElementById("url").value.trim();
  const resolution = document.getElementById("resolution").value;

  if (!url) {
    statusText.innerText = "❌ Please enter a YouTube URL";
    return;
  }

  statusText.innerText = "⏳ Downloading...";

  try {
    const response = await fetch(
      "https://yruvpad-backend-production.up.railway.app/download",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, resolution })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      statusText.innerText = "❌ " + (err.error || "Download failed");
      return;
    }

    const blob = await response.blob();
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();

    statusText.innerText = "✅ Download started";

  } catch (e) {
    statusText.innerText = "❌ Server error";
    console.error(e);
  }
});


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}


