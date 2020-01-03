const Article = require('./parsers')
const { fs } = require('./mods')
const HTML = require('./html')


async function run(URL){
    try{
        const selectors = JSON.parse(fs.readFileSync('selectors.json', 'utf-8')) 
        // this line of code will be coming from the database

        let extractHtml = new HTML(URL)
    
    
        const rawJSON = {selectors, rawHtml: await extractHtml.rawHtml(), sectionUrls: await extractHtml.Links()}
    
        console.log(rawJSON)
    
        const article = new Article(rawJSON)
    
        // console.log('Properties',Object.getOwnPropertyNames(scrape))
        // console.log('Descriptor',Object.getOwnPropertyDescriptors(scrape))
        // console.log('Functions',Object.entries(scrape))
        console.log( await article.Title())
        console.log( await article.DatePublish())
        // console.log(article.Author())
        // console.log(article.Section())
        // console.log(article.Content())
    }catch(e){
        console.warn('Error here', e)
    }
}

run('https://www.sunstar.com.ph/article/1838236/Network/World/Pope-Sorry-I-lost-patience-with-hand-shaker-who-yanked-me')
