import { Request, Response } from "express"
import { CancelApointmentService, ScheduleApointmentService, getAllApointmentsService, getApointmentByIdService } from "../services/AppointmentsServices";
import Appointment from "../entities/Appointments";
import IAppointmentDto from "../dtos/IAppointmentsDto";

export const getAllApointmentsController = async (req: Request, res: Response) => {
  try {
    const allAppointments = await getAllApointmentsService();
    res.status (200).json (allAppointments);
  } catch (error) {
    res.status (404).json ({error: error.message})
  }
  console.log ("Peticion a todos las reservas");
}

export const getApointmentByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const appointment: Appointment | undefined = await getApointmentByIdService(Number(id));
    res.status (200).json(appointment);
  } catch (error) {
    res.status (404).json ({message: error.message});
  }
}

export const postScheduleApointmentController = async (req: Request, res: Response) => {
  try {
    const appointmentDTO: IAppointmentDto = req.body;
    const newAppointment: Appointment = await ScheduleApointmentService(appointmentDTO);
    res.status (201).json (newAppointment);
  } catch (error) {
    res.status (400).json ({message: error.message});
  }
}

export const putCancelApointmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cancelledAppointment = await CancelApointmentService( Number(id));
    res.status (200).json (cancelledAppointment);
  } catch (error) {
    res.status (404).json (
      {error: error.message}
    );
  }
}
