import Appointment from "../models/Appointment";
import { startOfHour } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
/**
 * 1. Recebimento das informações,
 * 2. Tratativa de erros/exceções,
 * 3. Acesso ao Repositório,
 * Repetindo as interfaces, para se adequar a futuras mudanças facilmente;
 * Service não tem acesso direto aos dados da req, e res; Logo, recebe dados e retorna erros;
 */

interface Request {
  provider: string;
  date: Date;
}

/**
 * (SOLID)
 * Single Responsability Principle - 
 * Dependency Inversion Principle - Sempre que o service tiver uma dependência externa (Repository por ex),
 * Receber ele como parâmetro no constructor, pra todos estarem sincronizados com o mesmo repositório;
 * Passar ele de volta pro service com a tratativa;
 */
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
      this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
