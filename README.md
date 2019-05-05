# Google-Puppeteer-with-Express-PDF-Downloader

Uses Google Puppeteer Headless Chrome to load a webpage URL and output as a PDF.

### Parameters: 

Puppeteer API: https://pptr.dev/#?product=Puppeteer&version=v1.15.0&show=api-pagepdfoptions

options <Object> Options object which might have the following properties:
        path <string> The file path to save the PDF to. If path is a relative path, then it is resolved relative to current working directory. If no path is provided, the PDF won't be saved to the disk.
        scale <number> Scale of the webpage rendering. Defaults to 1. Scale amount must be between 0.1 and 2.
        displayHeaderFooter <boolean> Display header and footer. Defaults to false.
        headerTemplate <string> HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
            date formatted print date
            title document title
            url document location
            pageNumber current page number
            totalPages total pages in the document
        footerTemplate <string> HTML template for the print footer. Should use the same format as the headerTemplate.
        printBackground <boolean> Print background graphics. Defaults to false.
        landscape <boolean> Paper orientation. Defaults to false.
        pageRanges <string> Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
        format <string> Paper format. If set, takes priority over width or height options. Defaults to 'Letter'.
        width <string|number> Paper width, accepts values labeled with units.
        height <string|number> Paper height, accepts values labeled with units.
        margin <Object> Paper margins, defaults to none.
            top <string|number> Top margin, accepts values labeled with units.
            right <string|number> Right margin, accepts values labeled with units.
            bottom <string|number> Bottom margin, accepts values labeled with units.
            left <string|number> Left margin, accepts values labeled with units.
        preferCSSPageSize <boolean> Give any CSS @page size declared in the page priority over what is declared in width and height or format options. Defaults to false, which will scale the content to fit the paper size.
    returns: <Promise<Buffer>> Promise which resolves with PDF buffer.
