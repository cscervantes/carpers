const { S, cheerio } = require('../mods')

class Article {
    constructor(params){
        this.rawHtml            = params.rawHtml
        this.titleSelector      = params.selectors.titleSelector || null
        this.dateSelector       = params.selectors.dateSelector || null
        this.authorSelector     = params.selectors.authorSelector || null
        this.sectionSelector    = params.selectors.sectionSelector || null
        this.contentSelector    = params.selectors.contentSelector || null
        this.imageSelector      = params.selectors.imageSelector || null
        this.videoSelector      = params.selectors.videoSelector || null
    }

    Title(){
        let selector = this.titleSelector
        let html = this.rawHtml
        return new Promise((resolve, reject) => {
            try{
                let title = ''
                if(selector.length > 0){
                    let $ = cheerio.load(html, {normalizeWhitespace:true, decodeEntities: false})
                    for(let i = 0; i < selector.length; i++){
                        let select = $(selector[i].selector)
                        if(select.length > 0){
                            if(selector[i].attrib){
                                title = select.attr(selector[i].attrib).trim()
                            }else{
                                title = select.text().trim()
                            }
                            
                            break;
                        }
                    }
                    if(!title){
                        reject('[Title] No found selector!')
                    }
                    resolve(title)
                }else{
                    reject('Title selector is required!')
                }
            }catch(e){
                reject(e)
            }
        })
    }

    DatePublish(){
        let selector = this.dateSelector
        let html = this.rawHtml
        return new Promise((resolve, reject) => {
            try{
                let datePublish = ''
                if(selector.length > 0){
                    let $ = cheerio.load(html, {normalizeWhitespace:true, decodeEntities: false})
                    for(let i = 0; i < selector.length; i++){
                        let select = $(selector[i].selector)
                        if(select.length > 0){
                            if(selector[i].attrib){
                                datePublish = select.attr(selector[i].attrib)
                            }else{
                                datePublish = select.text().trim()
                            }
                            break;
                        }
                    }
                    if(!datePublish){
                        reject('[Date] No found selector!')
                    }
                    resolve(datePublish)
                }else{
                    reject('Date selector is required!')
                }
            }catch(e){
                reject(e)
            }
        })
    }

    Author(){
        let selector = this.authorSelector
        let html = this.rawHtml
        return new Promise((resolve, reject) => {
            try{
                let author = ''
                if(selector.length > 0){
                    let $ = cheerio.load(html, {normalizeWhitespace:true, decodeEntities: false})
                    for(let i = 0; i < selector.length; i++){
                        let select = $(selector[i].selector)
                        if(select.length > 0){
                            if(selector[i].attrib){
                                author = select.attr(selector[i].attrib)
                            }else{
                                author = select.text().trim()
                            }
                            break;
                        }
                    }
                    resolve(author)
                }else{
                    reject('Author selector is required!')
                }
            }catch(e){
                reject(e)
            }
        })
    }

    Section(){
        let selector = this.sectionSelector
        let html = this.rawHtml
        return new Promise((resolve, reject) => {
            try{
                let section = ''
                if(selector.length > 0){
                    let $ = cheerio.load(html, {normalizeWhitespace:true, decodeEntities: false})
                    for(let i = 0; i < selector.length; i++){
                        let select = $(selector[i].selector)
                        if(select.length > 0){
                            if(selector[i].attrib){
                                section = select.attr(selector[i].attrib)
                            }else{
                                section = select.text().trim()
                            }
                            break;
                        }
                    }
                    resolve(section)
                }else{
                    reject('Section selector is required!')
                }
            }catch(e){
                reject(e)
            }
        })
    }

    Content(){
        let selector = this.contentSelector
        let html = this.rawHtml
        let ignoreHtml = ['css', 'header', '#mvp-soc-mob-wrap', '#mvp-content-bot', '.mvp-cont-read-wrap', '#mvp-side-wrap', 'script', 'ins', 'div[class="pagingWrap"]', 'div[data-theiaPostSlider-sliderOptions]']
        return new Promise((resolve, reject) => {
            try{
                let content = ''
                if(selector.length > 0){
                    let $ = cheerio.load(html, {normalizeWhitespace:true, decodeEntities: false})
                    for(let i = 0; i < ignoreHtml.length; i++){
                        $(ignoreHtml[i]).remove()
                    }
                    for(let i = 0; i < selector.length; i++){
                        if($(selector[i].selector).length > 0){
                            // console.log($(selector[i].selector).length, selector[i].selector)
                            content = $(selector[i].selector).html()
                            content = $(content).text()
                            content = S(content).collapseWhitespace().s
                            break;
                        }
                    }
                    if(!content){
                        reject('[Content] No found selector!')
                    }
                    resolve(content)
                }else{
                    reject('Content selector is required!')
                }
            }catch(e){
                reject(e)
            }
        })
    }

    Images(){
        let html = this.rawHtml
        let selector = this.imageSelector
        return new Promise((resolve, reject) => {
            try{
                let images = []
                let $ = cheerio.load(html)
                console.log(selector)
                $(selector[0].selector).each(function(i, e){
                    images[i] = $(e).attr('src')
                })
                resolve(images)
            }catch(e){
                reject(e)
            }
        })
    }

    Vidoes(){

    }
}

module.exports = Article