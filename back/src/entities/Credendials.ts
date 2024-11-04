import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ({
  name: "credentials"
})
class Credential {
  @PrimaryGeneratedColumn()
  id: number

  @Column ()
  username: string

  @Column ()
  userpassword: string
}

export default Credential;