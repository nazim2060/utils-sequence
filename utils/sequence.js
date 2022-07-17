const sequenceModel = require('../models/Sequence/sequenceModel');

async function generator(sequence_type) {
    let isSequenceExists = await sequenceModel.findOne({sequence_type: sequence_type});

    if (isSequenceExists){
        let {sequence_number, sequence_digits} = isSequenceExists;
        let sequence = generateId(sequence_number, sequence_digits);
        await updateSequence(sequence, sequence_type);
        return sequence;
    } else {
        let {sequence_number} = createSequence(5, sequence_type);
        return sequence_number;
    }
}

async function createSequence(sequence_digits, sequence_type){
    let model = {
        sequence_number: fillZeros(1, sequence_digits),
        sequence_type: sequence_type,
        sequence_digits: sequence_digits
    };
    await sequenceModel.create(model, (err)=>{
        if (err) {
            console.log(`err in creating new ${sequence_type} sequence`);
            console.log(err);
        }
        console.log(`Successfully created new ${sequence_type} sequence`);
    });
    return model;
}

async function updateSequence(sequence_number, sequence_type){
    await sequenceModel.updateOne(
        {sequence_type: sequence_type}, 
        {$set: {sequence_number: sequence_number}}, (err)=>{
        if (err) {
            console.log(`err in updating ${sequence_type} sequence`);
            console.log(err);
        }
        console.log(`Successfully updated ${sequence_type} sequence`);
    });
}

function fillZeros(num, numDigits) {
    var number = num.toString();
    numDigits = numDigits - number.length;
    while(numDigits > 0) {
      number = "0" + number;
      numDigits--;
    }
    return number;
}

function incrementNumber(num, _max) {
    return num === _max ? null : ++num;
}

function generateId(numbers, numNumbers) {
    let maxNumber = Math.pow(10, numNumbers) - 1;
    let nextNumber = incrementNumber(numbers, maxNumber);
    return fillZeros(nextNumber, numNumbers);
}

module.exports = {
    generator
};