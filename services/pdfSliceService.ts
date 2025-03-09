export const handleUpload = async (file: File | null) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/pdf-slice", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.split(".")[0]}-sliced.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } else {
    alert("Upload failed");
  }
};
