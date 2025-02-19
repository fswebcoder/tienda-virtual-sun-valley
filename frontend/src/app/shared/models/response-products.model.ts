
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
    stock:    number;
    imageBase64: string;
} 