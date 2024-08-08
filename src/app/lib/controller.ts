import { response } from "express"

// check code 
async function checkCodeAccess(code_id: string, team_id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/checkAccess`, {
        method: 'POST',
        body: JSON.stringify({
            code_id: code_id,
            team_id: team_id
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data)
    return res
}


export { checkCodeAccess }