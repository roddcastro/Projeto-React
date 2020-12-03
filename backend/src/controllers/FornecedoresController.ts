import { Request, Response} from 'express';
import knex from '../database/connection';

class FornecedoresController {

    async index(request: Request, response: Response) {
        const fornecedores = await knex('fornecedores')
        .orderBy('id', 'desc');
  
        return response.json(fornecedores);
    }

    async create(request: Request, response: Response) {
    
        const {
            name,
        } = request.body;
        
        const fornecedor = {
            name
        };
  
        const trx = await knex.transaction();

        await trx('fornecedores').insert(fornecedor);

        await trx.commit();

        return response.status(200).json('Salvo com sucesso!');
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await knex("fornecedores")
          .where("id", id)
          .delete();
    
        return response.status(204).send();
    }
}

export default FornecedoresController;