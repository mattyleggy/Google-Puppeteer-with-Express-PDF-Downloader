const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

var app = express();
var server = http.createServer(app);
let port = 4105;

function downloadPDF(opts, callback) {
    console.log(`downloading: ${opts.url}`);
    (async () => {
        try {
            const browser = await puppeteer.launch({args: ['--no-sandbox']});
            const page = await browser.newPage();
            await page.goto(opts.url, {waitUntil: 'networkidle2'});                        
            opts.pdf["path"] = "generate.pdf";
            if (!opts.format) {
                opts.pdf["format"] = "A4";
            }
            await page.pdf(opts.pdf);    
            await browser.close();            
            callback({
                success: 1,
                file: opts.pdf.path,
                filename: opts.filename+".pdf",
            });
        } catch(e) {
            callback({
                success: 0,
                message: "Incorrect options"
            })
        }
    })();
}

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.options('/url', (req, res) => {    
    res.sendStatus(200);
});

app.post('/url', (req, res) => {   
    let data = req.body;    
    downloadPDF(req.body, (pptrResponse)=>{  
        console.log(pptrResponse)      
        if (!pptrResponse.success) {
            res.send(pptrResponse);
        } else {
            var file = fs.createReadStream(pptrResponse.file);
            var stat = fs.statSync(pptrResponse.file);
            res.setHeader('Access-Control-Expose-Headers', 'Content-Length,Content-Disposition');
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="'+pptrResponse.filename+'"');
            file.pipe(res);
        }
    });    
});

