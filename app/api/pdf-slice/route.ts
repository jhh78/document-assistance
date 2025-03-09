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

    archive.pipe(writableStream);

    for (let i = 0; i < numPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);
      const pdfBytes = await newPdf.save();
      archive.append(Buffer.from(pdfBytes), { name: `page-${i + 1}.pdf` });
    }

    await archive.finalize();

    const zipBuffer = Buffer.concat(chunks);

    return new Response(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="pages.zip"`,
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "PDF processing failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
