import { EntityRepository, Repository } from "typeorm";

import Appointment from "../models/Appointment";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  //Sempre o retorno de uma função assíncrona será uma Promise, aí ela sim tem o seu retorno;
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
