 //Staff props
 export type StaffProps = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
    gender: string,
    homeAddress: string,
    dob: string,
    state: string,
    lga: string,
    passport: string,
}

export type loginCredentialsProps = {
    email:string,
    password:string
}

//initial State props
export type InitialState = {
    loading: boolean,
    user: {},
    error: string,
    token?: string,
    isLoggedIn:boolean
}

export type loginResType ={
	success: boolean,
	status: number,
	message: string,
	details: {
		_id: string,
		rank: string,
		firstname: string,
		lastname: string
	},
	token: string
}