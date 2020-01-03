const { S, cheerio } = require('../mods')

class Article {
    constructor(params){
        this.rawHtml            = params.rawHtml
        this.titleSelector      = params.selectors.titleSelector || null
        this.dateSelector       = params.selectors.dateSelector || null
        this.authorSelector     = params.selectors.authorSelector || null
        this.sectionSelector    = params.selectors.sectionSelector || null
        this.contentSelector    = params.selectors.contentSelector || null
        this.imageVideoSelector = params.selectors.imageVideoSelector || null
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
                            // console.log(selector[i].selector, select.text().trim())
                            title = select.text().trim()
                            break;
                        }
                    }
                    if(!title){
                        reject('title No found selector!')
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
                        if($(selector[i].selector).length > 0){
                            // console.log($(selector[i].selector).length, selector[i].selector)
                            datePublish = $(selector[i].selector).attr('content')
                            break;
                        }
                    }
                    if(!datePublish){
                        reject('date No found selector!')
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
                        if($(selector[i].selector).length > 0){
                            // console.log($(selector[i].selector).length, selector[i].selector)
                            author = $(selector[i].selector).text()
                            break;
                        }
                    }
                    // if(!author){
                    //     reject('section No found selector!')
                    // }
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
                        if($(selector[i].selector).length > 0){
                            // console.log($(selector[i].selector).length, selector[i].selector)
                            section = $(selector[i].selector).text()
                            break;
                        }
                    }
                    // if(!section){
                    //     reject('section No found selector!')
                    // }
                    resolve(section)
                }else{
                    reject('section selector is required!')
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
                        reject('Content No found selector!')
                    }
                    resolve(content)
                }else{
                    reject('content selector is required!')
                }
            }catch(e){
                reject(e)
            }
        })
    }

    Images(){

    }

    Vidoes(){

    }
}

module.exports = Article