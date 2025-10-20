import multer from 'multer';
import { RESUME_UPLOAD_PATH } from '../constants/common';
import Resume from '../models/resume.model';

const upload = multer({ dest: RESUME_UPLOAD_PATH });


export const uploadResume = (req, res, next) => {
    const uploadSingle = upload.single('resume');
    uploadSingle(req, res, function (err) {
        if (err) {
            return res.status(400).json({ code: 'RESUME_UPLOAD_FAILED', message: 'Failed to upload resume.' });
        }
        next();
    });
}

export const handleResumeUpload = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ code: 'NO_FILE_UPLOADED', message: 'No file uploaded.' });
    }

    // Here you can add logic to save resume info to the database if needed

    try {
    let text = "";

    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
    } else if (req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const result = await mammoth.extractRawText({ path: req.file.path });
      text = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    console.log("Extracted Text:", text);

    // extract structured info
    // const extractedData = extractResumeData(text);
    const extractedData = {};

    // const resume = new Resume({
    //   userId: req.user._id, // if authenticated
    //   ...extractedData,
    // });

    // await resume.save();
    res.json({ message: "Resume uploaded successfully", resume: "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process resume" });
  }

    res.status(200).json({ code: 'RESUME_UPLOAD_SUC', filePath: req.file.path });
}