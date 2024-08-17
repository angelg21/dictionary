'use server'

const sleep = (seconds: number = 0):Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, seconds * 1000 );
    })
}

export const login = async ( values: any) => {
    await sleep(3)
    console.log(values)
}


export const register = async ( values: any) => {
    await sleep(3)
    setTimeout(() => {}, 3000)
    console.log(values)
}

