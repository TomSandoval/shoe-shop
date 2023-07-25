import { shoes } from "./shoes";


export function getAllCategories () {
    
    const uniqueNames = {};

    const categories = [];

    shoes.forEach(s => {
        if (!uniqueNames[s.category]) {
            categories.push(s.category)
            uniqueNames[s.category] = true
        }
    })


    return categories

}