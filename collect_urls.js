const { section } = require('./lambdas')
let URI = process.argv[2]

const collect = async (URI) => {
    try{
        let result = await section(URI)
        console.log(result)
    }catch(e){
        console.error(e)
    }
}

collect(URI)