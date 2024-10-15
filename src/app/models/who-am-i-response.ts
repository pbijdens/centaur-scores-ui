export interface WhoAmIResponse {
    id: number;
    claims: { [key: string]: string };
}