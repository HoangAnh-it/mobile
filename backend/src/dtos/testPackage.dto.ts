export interface CreateTestPackageDTO {
    name: string
    price: number;
    description: string | null;
    departmentId: string;
}

export interface UpdateTestPackageDTO extends Partial<CreateTestPackageDTO> { }