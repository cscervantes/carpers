const { section } = require('./lambdas')
const validate = async (URI, filters) => {
    try{
        let extracted_urls = await section.EXTRACT_URLS(URI)
        let sections = await section.SECTION_URLS(extracted_urls, filters)
        let articles = await section.ARTICLE_URLS(extracted_urls, filters)
        let data = {
            ...extracted_urls.domain, ...extracted_urls.url, ...sections.length, ...articles.length
        }

        return Promise.resolve(data)

    }catch(e){
        return Promise.reject(e)
    }
}

module.exports = validate