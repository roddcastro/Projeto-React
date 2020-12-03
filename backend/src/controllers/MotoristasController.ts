import { Request, Response} from 'express';
import knex from '../database/connection';

class MotoristasController {

    async index(request: Request, response: Response) {
        const motoristas = await knex('motoristas')
        .orderBy('id', 'desc');
  
        return response.json(motoristas);
    }

    async create(request: Request, response: Response) {
    
        const {
            name,
        } = request.body;
        
        const comprador = {
            name
        };
  
        const trx = await knex.transaction();

        await trx('motoristas').insert(comprador);

        await trx.commit();

        return response.status(200).json('Salvo com sucesso!');
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await knex("motoristas")
          .where("id", id)
          .delete();
    
        return response.status(204).send();
    }
}

export default MotoristasController;