import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRespository = new AppointmentsRepository();

//SoC: Separation of Concerns (Separação de preocupações);
//DRY : Don't Repeat Yourself;
//Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta (Se precisar, transforme os dados);

appointmentsRouter.get("/", (request, response) => {
  const appointments = appointmentsRespository.all();
  return response.json(appointments);
});

//Não precisa por o nome, pois ele já está definido no index;
appointmentsRouter.post("/", (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRespository
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
