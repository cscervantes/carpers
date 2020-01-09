const HTML = require('../html')

module.exports = (URL, FILTERS) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(URL){
                let extract = new HTML(URL)
                resolve(await extract.Links())
            }else{
                reject('Missing url!')
            }
        }catch(e){
            reject(`Error in section module [${URL}] \n${e}`)
        }
    })
}