const Article = require('../parser')
const { fs } = require('../mods')
const HTML = require('../html')

console.log('Environment:',process.env.NODE_ENV)

// async function scrape(URL){
//     try{
//         let html = new HTML(URL)
//         let selectors = JSON.parse(fs.readFileSync('selectors.json', 'utf-8'))
//         let rawHtml = await html.rawHtml()
//         let rawJSON = {selectors, rawHtml}

//         let article = new Article(rawJSON)
//         let title = await article.Title()
//         let publish = await article.DatePublish()
//         let section = await article.Section()
//         let author = await article.Author()
//         let content = await article.Content()
//         let url = await html.urlLink()
//         let jsonBody = {
//             title, publish, section, author, content, url
//         }
//         console.log(jsonBody)
//     }catch(e){
//         console.error('Something went wrong.',e)
//     }
// }

// let urls = process.argv[2].split(',')
// urls.forEach(element => {
//     setTimeout(() => {
//         scrape(element)
//     }, 500);
// });

module.exports = (URL, SELECTORS) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(URL){
                let html = new HTML(URL)
                let selectors = JSON.parse(fs.readFileSync('selectors.json', 'utf-8'))
                let rawHtml = await html.rawHtml()
                let rawJSON = {selectors, rawHtml}

                let article = new Article(rawJSON)
                let title = await article.Title()
                let publish = await article.DatePublish()
                let section = await article.Section()
                let author = await article.Author()
                let content = await article.Content()
                let url = await html.urlLink()

                let jsonBody = {
                    title, publish, section, author, content, url
                }
                resolve(jsonBody)
            }else{
                reject(`Missing article url!`)
            }
        }catch(e){
            reject(`Something wrong inside article.js [${URL}] \n${e}`)
        }
    })
}