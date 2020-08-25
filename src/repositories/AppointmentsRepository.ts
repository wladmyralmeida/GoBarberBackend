import Appointment from "../models/Appointment";
import { isEqual } from "date-fns";

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  //Named Params with DTO, enviando somente o objeto, em vez cada variável;
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({provider, date});

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    //Se não encontrar nenhuma, retorna falso, ou seja, null pra appointment;
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    );

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
