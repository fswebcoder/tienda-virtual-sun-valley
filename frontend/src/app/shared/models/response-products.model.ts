
export interface ResponseProductModel {
    products:      IProduct[];
    total:      number;
    totalPages: number;
}

export interface IProduct {
    id:          string;
    name:        string;
    description: string;
    price:       number;
    quantity:    number;
    imageBase64: string;
} 