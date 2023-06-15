export interface CreateUserDTO {
    email: string;
    name?: string;
    password:string
    birthDay?: Date;
    avatar?: string;
    phone?: string;
    address?:string
    role: "PATIENT" | "DOCTOR" | "ADMIN";
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> { }