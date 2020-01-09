const { strip, cheerio, S, u_parse, cscp } = require('../mods')

class Html {
    constructor(url){
        this.Url = function(){
            let u = url
            if(!u.startsWith('http')){
                return `http://${S(u).chompRight('/').chompLeft('/').s}`
            }else{
                return u
            }
        }
    }

    urlLink(){
        let Url = this.Url()
        return new Promise((resolve, reject)=>{
            try{   
                resolve(Url)
            }catch(e){
                reject(e)
            }
        })
    }

    urlDomain(){
        let Url = this.urlLink()
        return new Promise(async(resolve, reject)=>{
            try{
                let domain = u_parse(await Url)
                resolve(domain.hostname)
            }catch(e){
                reject(e)
            }
        })
    }

    rawHtml(){
        let Url = this.urlLink()
        return new Promise(async(resolve, reject)=>{
            try{
                cscp.get(await Url, (error, response, body) =>{
                    if(error){
                        reject(error)
                    }else{
                        let $ = cheerio.load(
                            body, 
                            {
                                normalizeWhitespace:true, 
                                decodeEntities: false
                            }
                        )
                        resolve(S(strip($('html').html())).collapseWhitespace().s)
                    }
                })  
            }catch(e){
                reject(e)
            }
        })
    }

    Links(){
        let Url = this.urlLink()
        let parseHtml = this.rawHtml()
        let domain = this.urlDomain()
        return new Promise(async(resolve, reject) => {
            try{
                let u_domain = await domain
                let $ = cheerio.load(await parseHtml)
                let links = $('body a')
                .map(function(){return $(this).attr('href') })
                .get()
                .filter((v)=>{
                    return v.length > 0
                }).map(v=>{
                    if(v.startsWith('//')){
                        return `http://${v}`
                    }else if(v.startsWith('/')){
                        return `http://${u_domain}${v}`
                    }else{
                        return v
                    }
                }).filter(v=>{
                    return v.includes(u_domain)
                })

                links.push(await Url)
                let hrefs = links.map(v=>{
                    let url = S(v).chompRight('/').s
                    url = S(url).replaceAll('https', 'http').s
                    return url
                }).filter(function(v){
                    return v.search(/((\.jpg)|(\.jpeg)|(\.mp4)|(\.mp3)|(\.png)|(\.mpeg)|(\.gif)|(\.bmp)|(\.docx)|(\.doc)|(\.pdf)|(\.js)|(\.css)|(\.jar)|(#)$)|((facebook.com)|(instagram.com)|(twitter.com)|(google.com)|(youtube.com))|(\/rss$)|(\/search\?)|(\?max-results=)|(login\.php)|(\/subscribe)|(#disqus_thread)|(\/profile$)|(\/member-agreement)|(\/about-us)|(\/contact-us)|(\/privacy-policy)|(\/copyright-notice)|(\/(add_to)\/)/gi) == -1
                })
                resolve(Array.from(new Set(hrefs)).sort())
            }catch(e){
                reject(e)
            }
        })
    }
}

module.exports = Html