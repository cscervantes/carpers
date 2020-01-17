const { section } = require('./lambdas')
let URI = process.argv[2]

const collect = async (URI) => {
    try{
        let filters = {
            article_filter: {
                includes: [],
                excludes: []
            },
            section_filter: {
                includes: [], 
                excludes: []
            }
            
            // article_filter: {
            //     includes: ['/\\/(story)$\/'],
            //     excludes: []
            // },
            // section_filter: {
            //     includes: [], 
            //     excludes: []
            // }
        }
        let extracted_urls = await section.EXTRACT_URLS(URI)
        console.log(extracted_urls)
        let sections = await section.SECTION_URLS(extracted_urls, filters)
        let articles = await section.ARTICLE_URLS(extracted_urls, filters)
        console.log({sections, articles})
        // console.log(articles.join('\n'))
    }catch(e){
        console.error(e)
    }
}

collect(URI)