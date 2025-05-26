//TYPES ZOD
import { z } from 'zod'

/*PARAMS*/
export type RouteParams = {
  projectId: string;
}

/*AUTH & USER*/
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()
});

const authResponse = z.object({
  message: z.string(),
  success: z.boolean(),
  token: z.string()
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>;

export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ConfirmToken = Pick<Auth, 'token'>;

export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>;
export type UpdatePasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>;
export type CheckPasswordForm = Pick<Auth, 'password'>;

type AuthResponse = z.infer<typeof authResponse>;
export type AuthAction = Pick<AuthResponse, 'message' | 'success'>;
export type AuthToken = Pick<AuthResponse, 'message' | 'success' | 'token'>;

export type CheckPassword = {
  message: string,
  success: boolean
}

/* USER */
export const userSchema = authSchema.pick({
  name: true,
  email: true
}).extend({
  /*
  .extend(): Es un método de Zod que permite agregar nuevos campos
   a un schema existente o extenderlo con validaciones adicionales.
  */
  _id: z.string()
});

export type User = z.infer<typeof userSchema>;
export type UserFormData = Pick<User, 'name' | 'email'>;

export type UserEdit = {
  message: string,
  success: boolean
}

/* NOTES */
const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string()
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

export type NoteEdit = {
  message: string,
  success: boolean
}

/* TASKS */
export const taskStatusSchema = z.enum(["pending", "on_hold", "inProgress", "underReview", "completed"]);

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(z.object({
    //Los arrays de subdocumentos son documentos embebidos, y por defecto se les asigna un _id a cada uno
    _id: z.string(),
    user: userSchema,
    status: taskStatusSchema
  })),
  notes: z.array(noteSchema.extend({
    createdBy: userSchema
  })),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true
});

export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
export type TaskProject = z.infer<typeof taskProjectSchema>;

export type TaskEdit = {
  message: string,
  success: boolean
}

/* PROJECTS */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(),
    tasks: z.array(taskProjectSchema),
    team: z.array(z.string(userSchema.pick( { _id: true } )))
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>;

export const dashboardProjectSchema = z.array(
    /*
    .pick(): Es un método de Zod que permite crear un nuevo esquema a partir 
    de uno existente, seleccionando solo algunas propiedades específicas.
    */
    projectSchema.pick({
      _id: true,
      projectName: true,
      clientName: true,
      description: true,
      manager: true
    })
);

export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true
});

export type ProjectEdit = {
  message: string,
  success: boolean
}

/* TEAM */
const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true
});

export const teamMemberSchemaFull = z.object({
  user: teamMemberSchema,
  success: z.boolean()
});

export const teamMembersSchema = z.object({
  project_team: z.array(teamMemberSchema),
  success: z.boolean()
});

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;

export type TeamApi = {
  user: TeamMember,
  success: boolean
}

export type TeamEdit = {
  message: string,
  success: boolean
}



