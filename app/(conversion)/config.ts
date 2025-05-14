const converterConfig: Record<
    string,
    {
        heading: string;
        supportedFormats: string;
        description: string;
        allowedExtensions: string;
        outputExtension: string;
    }
> = {
    "pdf-word": {
        heading: "PDF to Word Converter",
        supportedFormats: ".pdf",
        description: "Convert your PDF files into fully editable Word documents online — free and secure.",
        allowedExtensions: ".pdf",
        outputExtension: "docx",
    },
    "word-pdf": {
        heading: "Word to PDF Converter",
        supportedFormats: ".doc,.docx",
        description: "Easily convert Word documents into high-quality PDFs without losing formatting.",
        allowedExtensions: ".doc,.docx",
        outputExtension: "",
    },
    "pdf-excel": {
        heading: "PDF to Excel Converter",
        supportedFormats: ".pdf",
        description: "Extract data from PDFs into editable Excel spreadsheets — no sign-ups required.",
        allowedExtensions: ".pdf",
        outputExtension: "",
    },

    "pdf-ppt": {
        heading: "PDF to PowerPoint Converter",
        supportedFormats: ".pdf",
        description: "Turn your PDF documents into fully editable PowerPoint presentations in seconds.",
        allowedExtensions: ".pdf",
        outputExtension: "pptx",
    },
    "pdf-image": {
        heading: "PDF to Image Converter",
        supportedFormats: ".pdf",
        description: "Convert PDF to images for easy sharing and consistent formatting.",
        allowedExtensions: ".pdf",
        outputExtension: "jpg",
    },
    "image-pdf": {
        heading: "Image to PDF Converter",
        supportedFormats: ".png,.jpg,.jpeg,.webp,.svg,.gif",
        description: "Convert image to PDF for easy sharing and consistent formatting.",
        allowedExtensions: ".png,.jpg,.jpeg,.webp,.svg,.gif",
        outputExtension: "",
    },
};

export default converterConfig;
