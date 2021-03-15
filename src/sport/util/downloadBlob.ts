const downloadBlob = (data: object, filename: string) => {
    try {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const blobURL = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobURL;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (err) {
        // Do nothing
    }
};

export default downloadBlob;
