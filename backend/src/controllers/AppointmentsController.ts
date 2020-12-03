import { Request, Response} from 'express';
import knex from '../database/connection';

class AppointmentsController{

    async index(request: Request, response: Response) {
        const appointments = await knex('appointments')
        .leftJoin('fornecedores', 'appointments.fornecedor_id', 'fornecedores.id')
        .orderBy('id', 'desc');
  
        return response.json(appointments);
    }

    async create(request: Request, response: Response) {
    
        const {
            scheduling_at,
            fornecedor_id,
            comprador_id
        } = request.body;
        
        const speciality_doc = await knex('specialties_compradores')
        .where('comprador_id', comprador_id);


        const fornecedor = {
            scheduling_at,
            fornecedor_id,
            comprador_id
        };
  
        const trx = await knex.transaction();

        await trx('appointments').insert(fornecedor);

        await trx.commit();

        return response.status(200).json('Salvo com sucesso!');
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await knex("appointments")
          .where("id", id)
          .delete();
    
        return response.status(204).send();
    }
}

export default AppointmentsController;