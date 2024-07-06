
function base({title="Printshop", content="", bodyClass=""}){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link rel="stylesheet" href="static/style.css">
    </head>
    <body class="${bodyClass}">
    ${content}
    </body>
    </html>
`
}

function pages({title, contents=[]}){
    let page = (content) => `<div class="page">
        <div class="content">
            ${content}
        </div>
    </div>`;

    let content = contents.map(page).join("\n");
    return base({title, content});
}

module.exports = {
    base,
    pages
}