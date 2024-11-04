import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Credential from "./Credendials";
import Appointment from "./Appointments";
@Entity ({
  name: "users"
})
class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column ()
  name: string

  @Column ()
  email: string

  @Column ()
  birthdate: Date
  
  @Column ()
  nDni: string

  @OneToOne(() => Credential)
  @JoinColumn ()
  credentialsId: Credential

  @OneToMany (() => Appointment, (appointment) => appointment.user)
  appointments: Appointment []
}

export default User;