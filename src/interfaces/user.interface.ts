export interface User {
  id:            string
  name:          string | null;
  emailVerified?:Date | null   
  password:      string
  role:          string   
images?:        string | null
}