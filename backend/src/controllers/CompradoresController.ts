import { Request, Response} from 'express';
import knex from '../database/connection';

class CompradoresController {

    async index(request: Request, response: Response) {

        const compradores = await knex('compradores').orderBy('id', 'desc');

        const serializedcompradores = compradores.map( async comprador => {

            const specialties = await knex('specialties_compradores')
            .where('comprador_id', comprador.id);

            return {
                id: comprador.id,
                name: comprador.name
            }

        });

        return Promise.all(serializedCompradores).then((completed)  => response.json(completed));     
    }

    async create(request: Request, response: Response) {
    
        const {
            name,
        } = request.body;
        
        const comprador = {
            name,
        };
  
        const trx = await knex.transaction();
        const insertedIds =  await trx('compradores').insert(comprador);
        const comprador_id = insertedIds[0];
    
        await trx.commit();

        return response.status(200).json('Salvo com sucesso!');
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await knex("compradores")
          .where("id", id)
          .delete();
    
        return response.status(204).send();
      }
}

export default CompradoresController;