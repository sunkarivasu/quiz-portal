export type userType = 
    {
        _id: string,
        emailId: string,
        isAdmin: boolean
        name: string ,
        password: string,
        phoneNumber:string
        rank:number,
        solvedQuizs:{id: string, score: number, answered: number, _id: string}[]
        __v:number
    }