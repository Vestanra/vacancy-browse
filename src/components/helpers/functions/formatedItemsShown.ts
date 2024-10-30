export const formatedItemsShown = (page: number, items: number, total: number = 0) => {
    if (total === 0) return '0'
    
    if (page === 1) {
        return `1 - ${items < total ? items : total}`

    }
    
    let lastItems = (page - 1) * items + items
    return `${(page - 1) * items} - ${lastItems < total ? lastItems : total}`
};