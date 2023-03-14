
var Filter = require('bad-words'),
    filter = new Filter();
    filter.addWords('pancakes', 'waffles');
export const cleanWord = (word : string) => {
    return filter.clean(word);
}

export const badcheck = (word : string) => {
    if(filter.isProfane(word)){
        console.log(filter.isProfane("cum@damn.co.uk") + "Test")
        return true;
    } else {
        return false;
    }
}

