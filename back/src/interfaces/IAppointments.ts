enum AppointmentStatus {
  ACTIVE = "Active",
  CANCELED = "Cancelled",
  COMPLETE = "complete"
}

interface IAppointment {
  id: number;
  date: Date;
  time: string;
  status: AppointmentStatus;
  description: string;
  userId: number;
}

export default IAppointment;