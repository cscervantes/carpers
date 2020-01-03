class Oop{
    constructor(name, age){
        this.name = name
        this.age = age
    }
}

Oop.prototype.getAge = function(){
    return this.age
}

const bio = new Oop('Christian S. Cervantes', 24)

console.log(bio)
console.log(bio.name)
console.log(bio.getAge())

String.prototype.humanize = function(){
    return this.toLocaleUpperCase()
}

Array.prototype.descending = function(){
    return this.sort(function(a, b){
        return b - a
    })
}

console.log('christian'.humanize())