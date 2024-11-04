import { appointmentModel, userModel } from "../config/dataSource";
import IAppointmentDto from "../dtos/IAppointmentsDto";
import Appointment from "../entities/Appointments";

export const getAllApointmentsService = async (): Promise<Appointment[]> => {
  const allAppointments: Appointment[] = await appointmentModel.find({
    relations: { user: true }
  });
  return allAppointments;
};

export const getApointmentByIdService = async (id: number): Promise<Appointment | undefined> => {
  console.log (id);
  const foundAppointment: Appointment | undefined = await appointmentModel.findOne({
    where: {
      id
    },
  });
  if (!foundAppointment)
    throw new Error("Reserva no encontrada");
  return foundAppointment;
};

export const ScheduleApointmentService = async (appointmentDTO: IAppointmentDto): Promise<Appointment> => {
  const { userId } = appointmentDTO;
  const userIdNumber = Number(userId); // Convert userId to number
  const newAppointment = await appointmentModel.create(appointmentDTO);
  const user = await userModel.findOne({
    where: {
      id: userIdNumber
    },
  });
  
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  newAppointment.user = user;
  await appointmentModel.save(newAppointment);
  return newAppointment;
};

export const CancelApointmentService = async (appointmentId: number) => {
  console.log (appointmentId);
  const appointment = await appointmentModel.findOne({
    where: {
      id: appointmentId
    },
  });
  
  if (!appointment) {
    throw new Error("Reserva no encontrada");
  }

  appointment.status = "Cancelled";
  await appointmentModel.save(appointment);
  return appointment;
};
