export interface Order {
    id?: number;
    data?: string;
    estado?: string;
    tipo?: string;
    user_id?: number;
    fecha?: Date;
    descuento?: string;
    observacion?: string;
    medico?: string;
}