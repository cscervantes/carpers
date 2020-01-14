const HTML = require('../html')

Array.prototype.cleanUrl = function(){
    return Array.from(new Set(this.map(v=>v.replace(/^https/g, 'http').replace(/\/$/g, '')).sort()))
}

module.exports.EXTRACT_URLS = (URL, FILTERS) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(URL){
                let extract = new HTML(URL)
                let urls = await extract.Links()
                let domain = await extract.urlDomain()
                let url = await extract.urlLink()
                let json = {
                    url, domain, urls
                }
                resolve(json)
            }else{
                reject('Missing url!')
            }
        }catch(e){
            reject(`Error in EXTRACT_URLS(f) [${URL}] \n${e}`)
        }
    })
}

module.exports.SECTION_URLS = (params, FILTERS) => {
    return new Promise((resolve, reject) => {
        try{
            let urls = params.urls
            if(FILTERS.section_filter.includes.length > 0){
                urls = urls.filter(function(v){
                    let filters = FILTERS.section_filter.includes.map(function(f){
                        return `v.search(new RegExp(eval(${f}), 'g')) !== -1`
                    })
                    return eval(filters.join(' || '))
                })
            }

            if(FILTERS.section_filter.excludes.length > 0){
                urls = urls.filter(function(v){
                    let filters = FILTERS.section_filter.excludes.map(function(f){
                        return `v.search(new RegExp(eval(${f}), 'g')) === -1`
                    })
                    return eval(filters.join(' && '))
                })
            }
            urls.push(params.url)
            resolve(urls.cleanUrl())
        }catch(e){
            reject(`Error in SECTION_URLS(f)\n${e}`)
        }
    })
}

module.exports.ARTICLE_URLS = (params, FILTERS) => {
    return new Promise((resolve, reject) => {
        try{
            let urls = params.urls
            if(FILTERS.article_filter.includes.length > 0){
                urls = urls.filter(function(v){
                    let filters = FILTERS.article_filter.includes.map(function(f){
                        return `v.search(new RegExp(eval(${f}), 'g')) !== -1`
                    })
                    return eval(filters.join(' || '))
                })
            }

            if(FILTERS.article_filter.excludes.length > 0){
                urls = urls.filter(function(v){
                    let filters = FILTERS.article_filter.excludes.map(function(f){
                        return `v.search(new RegExp(eval(${f}), 'g')) === -1`
                    })
                    return eval(filters.join(' && '))
                })
            }
            
            resolve(urls.cleanUrl())
        }catch(e){
            reject(`Error in ARTICLE_URLS(f)\n${e}`)
        }
    })
}