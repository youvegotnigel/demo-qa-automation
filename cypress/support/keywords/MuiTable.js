
export default class MuiTable {

    elements = {
        data_grid: (role, index) => '(//div[@role=\''+role+'\'])['+index+']'
    }


    /**
     * @return table row xpath
     * @param cellInfo string array of table cell values
     */
    getTableRowXpath(tableName, index, cellInfo) {
        let values = prepareValues(cellInfo)
        this.scrollTableToView(tableName, index)
        return this.elements.data_grid(tableName, index) + prepareRowXpath(values)
        
    }

    getTableRowCheckBoxXpath(tableName, index, cellInfo){
        let values = prepareValues(cellInfo)
        this.scrollTableToView(tableName, index)
        return this.elements.data_grid(tableName, index) + prepareRowXpath(values) + '/descendant-or-self::input[@type=\'checkbox\']'
    }

    scrollTableToView(grid, index){
        cy.xpath(this.elements.data_grid(grid, index)).scrollIntoView()
    }


}

function prepareRowXpath(cellInfo){

    var xpath = ''
    var count=1

    cellInfo.forEach(element => {

        var translateText = './/*[translate(normalize-space(.), \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\') = \''+element+'\']'

        if(count == cellInfo.length){
            xpath = xpath.concat(translateText)
        }else{
            xpath = xpath.concat(translateText, ' and ')
        }
        count = count + 1
    });

    return '/descendant-or-self::div[@role=\'row\']/descendant-or-self::div[' + xpath + ']'
}

function prepareValues(array) {

    let a = []

    for(var i=0; i<array.length; i++){
        //let stripedText = array[i].replace(/\s+/g, '')  //remove spaces in the middle
        let stripedText = array[i].trim()
        a.push(stripedText.toLowerCase())  //convert to lowercase
    }
    return a; 
}