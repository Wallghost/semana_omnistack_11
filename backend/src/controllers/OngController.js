const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const data = request.body;

        const id = generateUniqueId();

        await connection('ongs').insert({
            ...data,
            id
        });

    return response.json({ id });
    },

    async update(request, response){
        const {email, whatsapp} = request.body;
        const id = request.headers.authorization;

        await connection('ongs').where('id', id).update({email: email, whatsapp: whatsapp});
        
        return response.json({message: "ONG update successful"})
    }
};