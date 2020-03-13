const axios = require('axios');
const fs = require("fs");
const path = require('path');

const getData =  async () => {
    const data = fs.readFileSync(path.resolve(__dirname, '../data/dataMock.js'));
    return JSON.parse(data);

}

const enrollmentValidation =  async (formData) => {

    const data = formData;

    if(data != String){
        return res.status(200).json({
            "error": false,
            "message": "the Request was Successful" 
        });
    }else if (data.length != 11){

        throw new Error('the Request cannot be Executed', 400);

    }else if (data === '11111111111'){

        throw new Error("Not Found", 404);

    }else if (data === '222222222222'){

        throw new Error( 'Not Acceptable', 406)

    }else if (data === '33333333333'){

        throw new Error( 'Internal Server Error', 500)

    }else if (data === "44444444444"){

        throw new Error( 'the request is not acepted', 504) 

    }

    return;

}


module.exports = {
    getData,
    enrollmentValidation
};