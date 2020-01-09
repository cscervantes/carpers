const { article } = require('./lambdas')
const { fs } = require('./mods')

const parse = async (URI) => {
    try{
        let result = await article(URI)
        console.log(result)
    }catch(e){
        console.error(e)
    }
}

let urls = fs.readFileSync('articles.txt', 'utf-8').split('\n').map(v=>v.trim())
urls.forEach(element => {
    setTimeout(() => {
        parse(element)
    }, 500);
});

