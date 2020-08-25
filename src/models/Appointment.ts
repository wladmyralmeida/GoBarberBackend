import { uuid } from "uuidv4";

class Appointment {
  id: string;

  provider: string;

  date: Date;

  //Receber todos os dados menos o id, que é passado por parâmetro de tipagem dentro da função Omit
  // 1.Tipo 2.Variável;
  constructor({ provider, date }: Omit<Appointment, "id">) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
