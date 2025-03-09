import { NextRequest } from "next/server";
import { PDFDocument } from "pdf-lib";
import archiver from "archiver";
import { Writable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const fileName = encodeURIComponent(file.name.split(".")[0]); // 파일 이름을 URL 인코딩

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfDoc = await PDFDocument.load(buffer);
    const numPages = pdfDoc.getPageCount();
    const archive = archiver("zip", { zlib: { level: 9 } });

    const chunks: Buffer[] = [];
    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        chunks.push(chunk);
        callback();
      },
    });

    writableStream.on("finish", () => {
      console.log("Writable stream finished");
    });

    writableStream.on("error", (err) => {
      console.error("Writable stream error:", err);
      throw err;
    });

    archive.on("error", (err) => {
      console.error("Archiver error:", err);
    });

    archive.pipe(writableStream);

    console.log(`Processing ${numPages} pages`);

    for (let i = 0; i < numPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);
      const pdfBytes = await newPdf.save();
      archive.append(Buffer.from(pdfBytes), { name: `page-${i + 1}.pdf` });
      console.log(`Page ${i + 1} added to archive`);
    }

    await archive.finalize();
    console.log("Archive finalized");

    const zipBuffer = Buffer.concat(chunks);
    console.log("ZIP buffer created", zipBuffer, fileName);

    return new Response(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="pages.zip"`,
      },
    });
  } catch (error) {
    console.error("Error during PDF processing:", error);
    return new Response(JSON.stringify({ error: "PDF processing failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
