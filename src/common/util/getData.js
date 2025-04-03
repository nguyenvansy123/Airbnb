import _ from 'lodash';

const getInfoData = ({ fileds = [], object = {} }) => {
    console.log({ fileds, object });
    
    return _.pick(object, fileds)
}

export default getInfoData
