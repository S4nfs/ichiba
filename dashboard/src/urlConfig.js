export const api = `${process.env.API}/api`
export const generatePublicUrl = (filename) => {
    return `${process.env.API}/public/${filename}`
}