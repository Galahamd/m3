import { Router } from "express";
import { getAllApointmentsController, getApointmentByIdController, postScheduleApointmentController, putCancelApointmentController } from "../controllers/apointmentsControllers";

const appointmentsRouter = Router();


appointmentsRouter.get ("/",getAllApointmentsController);
appointmentsRouter.get ("/:id",getApointmentByIdController);
appointmentsRouter.post ("/schedule",postScheduleApointmentController);
appointmentsRouter.put ("/cancel/:id",putCancelApointmentController);

export default appointmentsRouter;