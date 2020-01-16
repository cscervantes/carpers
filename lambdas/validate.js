const section = require('./section')
const validate = async (URI, filters) => {
    try{
        let extracted_urls = await section.EXTRACT_URLS(URI)
        let sections = await section.SECTION_URLS(extracted_urls, filters)
        let articles = await section.ARTICLE_URLS(extracted_urls, filters)
        let data = {
            domain:extracted_urls.domain, 
            url: extracted_urls.url,
            section_meta: {
                urls: sections,
                total: sections.length, 
            },
            article_meta: {
                urls: articles,
                total: articles.length
            } 
        }

        // console.log(data)

        return Promise.resolve(data)

    }catch(e){
        return Promise.reject(e)
    }
}

module.exports = validate