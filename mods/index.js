module.exports = {
    cheerio : require('cheerio'),
    rq : require('request').defaults({json:true}),
    S       : require('string'),
    moment  : require('moment'),
    mysql   : require('mysql'),
    fs      : require('fs'),
    strip   : require('strip-html-comments'),
    u_parse : require('url').parse,
    cscp    : require('cloudscraper')
}