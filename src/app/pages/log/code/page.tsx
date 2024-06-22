"use client"

import CodeMirror from '@uiw/react-codemirror';
import { materialDark, materialLight } from '@uiw/codemirror-theme-material';
import { useEffect, useState } from 'react';
import NavBar from '@/app/components/navbar';
import jsPDF from 'jspdf';

export default function Code() {
    const [code, setCode] = useState("")
    const [reset, setReset] = useState()

    useEffect(() => {
        setCode("")
    }, [reset])

    function saveAsPdf(text: string, filename: string, fontSize: number = 12): void {
        const doc = new jsPDF();

        // Set the font size
        doc.setFontSize(fontSize);

        // Define page dimensions and margins
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const margin = 10;

        const maxTextWidth = pageWidth - margin * 2;
        const maxTextHeight = pageHeight - margin * 2;

        const lineSpace = 6;

        // Split the text into lines that fit within the max text width
        let lines = doc.splitTextToSize(text, maxTextWidth);

        // Calculate maximum lines per page
        const linesPerPage = Math.floor(maxTextHeight / (lineSpace));

        // Calculate total pages needed
        const totalPages = Math.ceil(lines.length / linesPerPage);

        // Iterate through each page
        let cursor = 0;
        for (let i = 1; i <= totalPages; i++) {
            // Add new page if not the first page
            if (i > 1) {
                doc.addPage();
            }

            // Define starting coordinates
            let x = margin;
            let y = margin;

            // Get lines for current page
            const currentPageLines = lines.slice(cursor, cursor + linesPerPage);

            // Add each line of text to the current page
            for (let line of currentPageLines) {
                doc.text(line, x, y);
                y += lineSpace; // Move down by the font size plus some line spacing
            }

            // Move cursor to next set of lines
            cursor += linesPerPage;
        }

        // Save the PDF with the given filename
        doc.save(filename);
    }

    function download() {
        // Usage
        saveAsPdf(code, "myfile.pdf");
    }

    return (
        <div style={{ backgroundColor: "#3A4A59" }} className='w-full h-screen'>
            <NavBar />
            <div className="pl-16 pr-16 mt-10 flex flex-row items-start">
                <button
                    className='p-3 rounded bg-blue-500 hover:bg-blue-300'
                    onClick={download}>Download</button>
                <CodeMirror
                    height="500px"
                    value={code}
                    className="w-full pl-8"
                    onChange={e => setCode(e)}
                    theme={materialDark}
                />
            </div>
        </div>
    )
}