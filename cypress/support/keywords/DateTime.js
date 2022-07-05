const moment = require('moment-timezone');

function DateTime(){

    var timeZone = Cypress.env('timeZone')

    this.formatIfDatetime = function(text){

        switch(text){

            case 'now':
			    return this.getCurrentDateTime(timeZone, 'yyyy/MM/DD HH:mm:ss')

		    case 'today':
			    return this.getCurrentDateTime(timeZone, 'D MMM yyyy')

		    case 'future':
			    return this.getFutureDate(1, timeZone, 'D MMM yyyy')

		    case 'previous':
			    return this.getPreviousDate(1, timeZone, 'D MMM yyyy')

            case 'yesterday':
			    return this.getPreviousDate(1, timeZone, 'yyyy/MM/DD HH:mm:ss')

            case 'previous hour':
                return this.getPreviousTime(1, 0, timeZone, 'HH:mm:ss')
        
            case 'future hour':
                return this.getFutureTime(1, 0, timeZone, 'HH:mm:ss')   
            
            case 'previous time':
                return this.getPreviousTime(0, 30, timeZone, 'HH:mm:ss')
            
            case 'future time':
                return this.getFutureTime(0, 30, timeZone, 'HH:mm:ss')  
        
            case 'today dd':
                return this.getCurrentDateTime(timeZone, 'DD')

            default:

                if (text.match("^now HH\\-\\d{1,2}$")) {                
                    let change = text.split('now HH-');
			        return this.getPreviousTime(parseInt(change[1]), 0, timeZone, 'HH:mm:ss');
                }

                else if(text.match("^now HH\\+\\d{1,2}$")){
                    let change = text.split('now HH+');
			        return this.getFutureTime(parseInt(change[1]), 0, timeZone, 'HH:mm:ss');
                }

                else if(text.match("^now mm\\-\\d{1,2}$")){
                    let change = text.split('now mm-');
			        return this.getPreviousTime(0, parseInt(change[1]), timeZone, 'HH:mm:ss');
                }

                else if(text.match("^now mm\\+\\d{1,2}$")){
                    let change = text.split('now mm+');
			        return this.getFutureTime(0, parseInt(change[1]), timeZone, 'HH:mm:ss');
                }

                else if(text.match("^future\\+\\d{1,2}$")){
                    let change = text.split('future+');
                    return this.getFutureDate(parseInt(change[1]), timeZone, 'D MMM yyyy');
                }

                else if(text.match("^previous\\+\\d{1,2}$")){
                    let change = text.split('previous+');
                    return this.getPreviousDate(parseInt(change[1]), timeZone, 'D MMM yyyy');
                }

		return text;
    }
  
}

    this.getCurrentDateTime = function(timeZone, format){
        return moment().tz(timeZone).format(format);
    }

    this.getFutureDate = function(noOfDays, timeZone, format){
        let forwardDays = new moment().tz(timeZone).add(noOfDays,'day')
        return forwardDays.format(format);
    }

    this.getPreviousDate = function(noOfDays, timeZone, format){
        let backwardDays = new moment().tz(timeZone).subtract(noOfDays,'day')
        return backwardDays.format(format);
    }

    this.getPreviousTime = function(hrs, mins, timeZone, format){
        let backwardTime = new moment().tz(timeZone).subtract(hrs,'h').subtract(mins,'m');
        return backwardTime.format(format);
    }

    this.getFutureTime = function(hrs, mins, timeZone, format){
        let forwardTime = new moment().tz(timeZone).add(hrs,'h').add(mins,'m');
        return forwardTime.format(format);
    }

}

module.exports = DateTime;