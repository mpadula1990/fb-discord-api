var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./test/businesscard.html', 'utf8');
var options = { format: 'Letter' };

const generateTableReport = (rows: any[]) => {
    const htmlTemplate = getHtmlTable(rows);

    pdf.create(html, options).toFile('./businesscard.pdf', function(err: any, res:any) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
}

const getHtmlTable = (rows:any[]) => {

}