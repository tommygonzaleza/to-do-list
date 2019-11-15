var words = {
    pronoun: ["the", "our"],
    adjective: ["great", "big"],
    noun: ["jogger", "racoon"]
}
var domain_generated = [];

function domainGenerator() {
    for(let i = 0; i < words.pronoun.length; i++) {
        for(let j = 0; j < words.adjective.length; j++) {
            for(let k = 0; k < words.noun.length; k++) {
                domain_generated.push(" " + words.pronoun[i] + words.adjective[i] + words.noun[i] + ".com ");
            }
        }
    }
}

domainGenerator();
document.write(domain_generated);