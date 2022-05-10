var helperFunc = {
    helperMoneyFormatter(value){
        if(value != null && value != '' && value != undefined){
            var numberString = value.replace(/^0+/, '')
            return parseFloat(numberString.replace(/,/g, ""))
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        } else if(value === 0 || value === '0' || isNaN(value)){return '0'}
    },

}

export default helperFunc