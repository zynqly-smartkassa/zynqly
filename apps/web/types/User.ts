type Role = "UNTERNEHMER" | "FAHRER" | "BUCHHALTER"


export interface User {

	name: string,
	email: string,
	phone: string,
	role: Role

}
